const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  role: {
    type: String,
    enum: ['youth', 'organization', 'admin'],
    default: 'youth'
  },
  profile: {
    firstName: { type: String, required: [true, 'First name is required'], trim: true },
    lastName: { type: String, required: [true, 'Last name is required'], trim: true },
    phone: { type: String, trim: true },
    avatar: { type: String, default: '' },
    bio: { type: String, maxlength: 500 },
    skills: [{ type: String, trim: true }],
    interests: [{ type: String, trim: true }],
    county: { type: String, required: [true, 'County is required'] },
    town: { type: String, trim: true },
    neighborhood: { type: String, trim: true },
    coordinates: {
      type: [Number],
    
    },
    education: [{
      institution: String,
      level: { type: String, enum: ['High School', 'Certificate', 'Diploma', 'Degree', 'Masters', 'PhD', 'Other'] },
      field: String,
      yearCompleted: Number
    }],
    socials: {
      linkedin: String,
      twitter: String,
      portfolio: String
    }
  },
  preferences: {
    gigTypes: [{ type: String, enum: ['one-time', 'recurring', 'project-based', 'weekend-only'] }],
    notifyEmail: { type: Boolean, default: true },
    notifyPush: { type: Boolean, default: true },
    radiusKm: { type: Number, default: 50, min: 1, max: 500 }
  },
  stats: {
    gigsPosted: { type: Number, default: 0 },
    gigsApplied: { type: Number, default: 0 },
    gigsCompleted: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 }
  },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

userSchema.index({ 'profile.coordinates': '2dsphere' })
userSchema.index({ 'profile.county': 1, 'profile.town': 1 })
userSchema.index({ role: 1, isActive: 1 })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.getFullName = function () {
  return this.profile.firstName + ' ' + this.profile.lastName
}

module.exports = mongoose.model('User', userSchema)
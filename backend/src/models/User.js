// backend/src/models/User.js
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  // 🔐 Authentication Fields (from auth branch - tested & working)
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['youth', 'organization', 'admin'], // ✅ Keep main's roles for org postings
    default: 'youth'
  },

  // 👤 Profile Fields (merged: auth branch basics + main's Kenya-specific enhancements)
  profile: {
    firstName: { type: String, required: [true, 'First name is required'], trim: true },
    lastName: { type: String, required: [true, 'Last name is required'], trim: true },
    phone: { type: String, trim: true },
    avatar: { type: String, default: '' },
    bio: { type: String, maxlength: 500 },
    skills: [{ type: String, trim: true, lowercase: true }], // ✅ lowercase from auth branch
    interests: [{ type: String, trim: true }],
    county: { type: String, required: [true, 'County is required'] }, // ✅ Critical for Kenya
    town: { type: String, trim: true },
    neighborhood: { type: String, trim: true },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere' // ✅ Geospatial indexing for location search
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

  // ⚙️ Preferences for personalized experience
  preferences: {
    gigTypes: [{ type: String, enum: ['one-time', 'recurring', 'project-based', 'weekend-only'] }],
    notifyEmail: { type: Boolean, default: true },
    notifyPush: { type: Boolean, default: true },
    radiusKm: { type: Number, default: 50, min: 1, max: 500 }
  },

  // 📊 Stats for reputation system
  stats: {
    gigsPosted: { type: Number, default: 0 },
    gigsApplied: { type: Number, default: 0 },
    gigsCompleted: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 }
  },

  // 🔒 Account status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// 🔍 Indexes for performance
userSchema.index({ email: 1 }) // Fast login lookups
userSchema.index({ username: 1 }) // Fast profile lookups
userSchema.index({ 'profile.coordinates': '2dsphere' }) // Geospatial search
userSchema.index({ 'profile.county': 1, 'profile.town': 1 }) // Location filtering
userSchema.index({ role: 1, isActive: 1 }) // Role-based queries

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// 🔑 Method to compare passwords (tested & working)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// 👤 Helper method to get full name
userSchema.methods.getFullName = function () {
  return `${this.profile.firstName} ${this.profile.lastName}`
}

// 👤 Virtual for full user display (optional but useful)
userSchema.virtual('displayName').get(function () {
  return this.username || this.getFullName()
})

module.exports = mongoose.model('User', userSchema)
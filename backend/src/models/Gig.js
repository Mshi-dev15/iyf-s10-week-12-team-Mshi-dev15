const mongoose = require('mongoose')

const gigSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 120 },
  slug: { type: String, unique: true, index: true },
  description: { type: String, required: [true, 'Description is required'], maxlength: 5000 },

  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Technology', 'Design & Creative', 'Writing & Content',
      'Marketing & Sales', 'Events & Hospitality', 'Manual Labor',
      'Delivery & Logistics', 'Teaching & Tutoring', 'Healthcare',
      'Agriculture', 'Construction', 'Cleaning & Domestic',
      'Photography & Video', 'Music & Entertainment', 'Other'
    ]
  },

  gigType: {
    type: String,
    required: true,
    enum: ['one-time', 'recurring', 'project-based', 'weekend-only']
  },

  location: {
    county: { type: String, required: [true, 'County is required'] },
    town: { type: String, required: [true, 'Town is required'] },
    neighborhood: { type: String, trim: true },
    address: { type: String, trim: true },
    isRemote: { type: Boolean, default: false },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  organization: {
    name: { type: String, trim: true },
    logo: String,
    website: String,
    verified: { type: Boolean, default: false }
  },

  requirements: [{ type: String, trim: true }],
  responsibilities: [{ type: String, trim: true }],
  skillsNeeded: [{ type: String, trim: true }],

  schedule: {
    startDate: { type: Date, required: [true, 'Start date is required'] },
    endDate: Date,
    deadline: { type: Date, required: [true, 'Application deadline is required'] },
    duration: { type: String, trim: true },
    hoursPerDay: { type: Number, min: 1, max: 24 }
  },

  compensation: {
    type: {
      type: String,
      enum: ['fixed', 'negotiable', 'per-hour', 'per-day', 'unpaid'],
      required: true
    },
    amount: { type: Number, min: 0 },
    currency: { type: String, default: 'KES' },
    notes: { type: String, trim: true }
  },

  status: {
    type: String,
    enum: ['draft', 'active', 'closed', 'filled', 'cancelled'],
    default: 'active'
  },

  engagement: {
    views: { type: Number, default: 0 },
    applicationCount: { type: Number, default: 0 },
    maxApplications: { type: Number, min: 1 },
    saveCount: { type: Number, default: 0 }
  },

  tags: [{ type: String, trim: true, lowercase: true }],
  featured: { type: Boolean, default: false },
  images: [{ type: String }],

  isFlagged: { type: Boolean, default: false },
  flagReason: String,
  moderatedAt: Date,
  moderatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

gigSchema.index({ 'location.coordinates': '2dsphere' })
gigSchema.index({ status: 1, createdAt: -1 })
gigSchema.index({ category: 1, 'location.county': 1, status: 1 })
gigSchema.index({ gigType: 1, status: 1 })
gigSchema.index({ featured: 1, status: 1, createdAt: -1 })
gigSchema.index({ title: 'text', description: 'text', tags: 'text', 'location.county': 'text', 'location.town': 'text' })

gigSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next()
  const base = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const timestamp = Date.now().toString(36)
  this.slug = base + '-' + timestamp
  next()
})

module.exports = mongoose.model('Gig', gigSchema)
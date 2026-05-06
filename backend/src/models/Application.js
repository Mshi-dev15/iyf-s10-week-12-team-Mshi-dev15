const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, maxlength: 1000, trim: true },
  proposedRate: { type: Number, min: 0 },
  resumeUrl: String,
  portfolioUrl: String,
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  reviewedAt: Date,
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewNote: { type: String, trim: true },
  startedAt: Date,
  completedAt: Date,
  rating: {
    byPoster: { score: { type: Number, min: 1, max: 5 }, comment: String },
    byApplicant: { score: { type: Number, min: 1, max: 5 }, comment: String }
  }
}, { timestamps: true })

applicationSchema.index({ gig: 1, applicant: 1 }, { unique: true })
applicationSchema.index({ applicant: 1, status: 1 })
applicationSchema.index({ gig: 1, status: 1 })

module.exports = mongoose.model('Application', applicationSchema)
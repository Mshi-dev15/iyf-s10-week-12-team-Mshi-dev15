const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['new_gig', 'application_received', 'application_update', 'message', 'gig_reminder', 'system'],
    required: true
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  data: {
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    url: String
  },
  isRead: { type: Boolean, default: false },
  sentVia: [{ type: String, enum: ['in-app', 'email', 'push', 'sms'] }],
  readAt: Date
}, { timestamps: true })

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 })
notificationSchema.index({ recipient: 1, createdAt: -1 })

module.exports = mongoose.model('Notification', notificationSchema)
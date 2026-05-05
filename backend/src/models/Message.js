const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 2000, trim: true },
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
  attachments: [{ type: String }],
  readAt: Date,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 })
messageSchema.index({ recipient: 1, readAt: 1, createdAt: -1 })

module.exports = mongoose.model('Message', messageSchema)
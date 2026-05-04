const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  category: {
    type: String,
    enum: ['internship', 'gig', 'volunteer', 'event', 'other'],
    default: 'other'
  },
  location: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Text index for search
postSchema.index({ title: 'text', content: 'text', location: 'text' })

// Virtual for comments count
postSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true
})

// Instance method: increment likes
postSchema.methods.incrementLikes = function() {
  this.likes = (this.likes || 0) + 1
  return this.save()
}

// Static method: find by author
postSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId }).sort({ createdAt: -1 })
}

module.exports = mongoose.model('Post', postSchema)

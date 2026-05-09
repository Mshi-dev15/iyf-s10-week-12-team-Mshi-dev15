// backend/src/models/Post.js
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
    // No maxlength to allow long-form opportunities
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
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  votedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote']
    }
  }],
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

// 🔍 Text index for search functionality
postSchema.index({ title: 'text', content: 'text', location: 'text' })

// 💬 Virtual for comments count (nested resource display)
postSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true
})

// 👍 Instance method: increment likes atomically
postSchema.methods.incrementLikes = function() {
  this.likes = (this.likes || 0) + 1
  return this.save()
}

// 👆 Instance method: handle upvote/downvote
postSchema.methods.vote = function(userId, voteType) {
  const existingVote = this.votedBy.find(v => v.user.toString() === userId.toString())
  
  if (existingVote) {
    // Remove old vote effect
    if (existingVote.voteType === 'upvote') {
      this.upvotes = Math.max(0, this.upvotes - 1)
    } else if (existingVote.voteType === 'downvote') {
      this.downvotes = Math.max(0, this.downvotes - 1)
    }
    
    // If same vote type, remove it (toggle off)
    if (existingVote.voteType === voteType) {
      this.votedBy = this.votedBy.filter(v => v.user.toString() !== userId.toString())
    } else {
      // Change vote type
      existingVote.voteType = voteType
      if (voteType === 'upvote') {
        this.upvotes += 1
      } else {
        this.downvotes += 1
      }
    }
  } else {
    // New vote
    this.votedBy.push({ user: userId, voteType })
    if (voteType === 'upvote') {
      this.upvotes += 1
    } else {
      this.downvotes += 1
    }
  }
  
  return this.save()
}

// 👤 Static method: find posts by author
postSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId }).sort({ createdAt: -1 })
}

module.exports = mongoose.model('Post', postSchema)
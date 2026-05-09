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
  votes: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    netScore: { type: Number, default: 0 } // upvotes - downvotes
  },
  userVotes: [{ // Track which users voted to prevent double voting
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    voteType: { type: String, enum: ['upvote', 'downvote'] },
    votedAt: { type: Date, default: Date.now }
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

// 👤 Static method: find posts by author
postSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId }).sort({ createdAt: -1 })
}

// 🗳️ Instance method: handle voting
postSchema.methods.addVote = function(userId, voteType) {
  // Remove any existing vote from this user
  this.userVotes = this.userVotes.filter(vote => vote.user.toString() !== userId.toString())
  
  // Add new vote
  this.userVotes.push({
    user: userId,
    voteType: voteType,
    votedAt: new Date()
  })
  
  // Update vote counts
  if (voteType === 'upvote') {
    this.votes.upvotes += 1
  } else if (voteType === 'downvote') {
    this.votes.downvotes += 1
  }
  
  // Update net score
  this.votes.netScore = this.votes.upvotes - this.votes.downvotes
  
  return this.save()
}

// 🗳️ Instance method: remove vote
postSchema.methods.removeVote = function(userId) {
  const existingVote = this.userVotes.find(vote => vote.user.toString() === userId.toString())
  if (!existingVote) return this.save()
  
  // Remove the vote
  this.userVotes = this.userVotes.filter(vote => vote.user.toString() !== userId.toString())
  
  // Update vote counts
  if (existingVote.voteType === 'upvote') {
    this.votes.upvotes = Math.max(0, this.votes.upvotes - 1)
  } else if (existingVote.voteType === 'downvote') {
    this.votes.downvotes = Math.max(0, this.votes.downvotes - 1)
  }
  
  // Update net score
  this.votes.netScore = this.votes.upvotes - this.votes.downvotes
  
  return this.save()
}

// 🗳️ Instance method: get user's vote
postSchema.methods.getUserVote = function(userId) {
  const vote = this.userVotes.find(vote => vote.user.toString() === userId.toString())
  return vote ? vote.voteType : null
}

module.exports = mongoose.model('Post', postSchema)
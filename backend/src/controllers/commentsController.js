const Comment = require('../models/Comment')
const Post = require('../models/Post')
const { asyncHandler } = require('../middleware/errorHandler')

// @desc    Get comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ createdAt: -1 })
  
  res.json({ success: true, data: comments })
})

// @desc    Add comment to post
// @route   POST /api/posts/:postId/comments
// @access  Private
exports.createComment = asyncHandler(async (req, res) => {
  const { content } = req.body
  const { postId } = req.params
  
  // Verify post exists
  const post = await Post.findById(postId)
  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }
  
  const comment = await Comment.create({
    content,
    author: req.user._id,
    post: postId
  })
  
  // Populate author before sending
  await comment.populate('author', 'username')
  
  res.status(201).json({ success: true, data: comment })
})

// @desc    Delete comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private (author or admin only)
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId)
  
  if (!comment) {
    res.status(404)
    throw new Error('Comment not found')
  }
  
  // Check authorization: comment author or admin
  const isAuthor = comment.author.toString() === req.user._id.toString()
  const isAdmin = req.user.role === 'admin'
  
  if (!isAuthor && !isAdmin) {
    res.status(403)
    throw new Error('You can only delete your own comments')
  }
  
  await comment.deleteOne()
  
  res.json({ success: true, message: 'Comment deleted' })
})
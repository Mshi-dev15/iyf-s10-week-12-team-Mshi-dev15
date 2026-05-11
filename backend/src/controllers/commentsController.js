const Comment = require('../models/Comment')
const Post = require('../models/Post')
const { asyncHandler, ApiError } = require('../middleware/errorHandler')

// @desc    Get comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username email profile.firstName profile.lastName')
    .sort({ createdAt: -1 })
  
  res.json({ success: true, data: comments })
})

// @desc    Add comment to post
// @route   POST /api/posts/:postId/comments
// @access  Private
exports.createComment = asyncHandler(async (req, res) => {
  const { content } = req.body
  const { postId } = req.params

  if (!content || content.trim().length < 1) {
    throw new ApiError('Comment content is required', 400, 'VALIDATION_ERROR')
  }
  
  // Verify post exists
  const post = await Post.findById(postId)
  if (!post) {
    throw new ApiError('Post not found', 404, 'NOT_FOUND')
  }
  
  const comment = await Comment.create({
    content: content.trim(),
    author: req.user._id,
    post: postId
  })
  
  // Populate author before sending
  await comment.populate('author', 'username email profile.firstName profile.lastName')
  
  res.status(201).json({ success: true, data: comment })
})

// @desc    Delete comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private (author or admin only)
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId)
  
  if (!comment) {
    throw new ApiError('Comment not found', 404, 'NOT_FOUND')
  }
  
  // Check authorization: comment author or admin
  const isAuthor = comment.author.toString() === req.user._id.toString()
  const isAdmin = req.user.role === 'admin'
  
  if (!isAuthor && !isAdmin) {
    throw new ApiError('You can only delete your own comments', 403, 'FORBIDDEN')
  }
  
  await comment.deleteOne()
  
  res.status(204).send()
})

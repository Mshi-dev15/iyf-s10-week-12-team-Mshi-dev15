const Comment = require('../models/Comment')
const Post = require('../models/Post')
const { asyncHandler } = require('../middleware/errorHandler')

// @desc    Get comments for a post
exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ createdAt: -1 })
  res.json(comments)
})

// @desc    Add comment
exports.createComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId)
  if (!post) { res.status(404); throw new Error('Post not found') }
  
  const comment = await Comment.create({
    content: req.body.content,
    author: req.user._id,
    post: req.params.postId
  })
  await comment.populate('author', 'username')
  res.status(201).json(comment)
})

// @desc    Delete comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId)
  if (!comment) { res.status(404); throw new Error('Comment not found') }
  
  const isAuthor = comment.author.toString() === req.user._id.toString()
  const isAdmin = req.user.role === 'admin'
  if (!isAuthor && !isAdmin) { res.status(403); throw new Error('Permission denied') }
  
  await comment.deleteOne()
  res.status(204).send()
})
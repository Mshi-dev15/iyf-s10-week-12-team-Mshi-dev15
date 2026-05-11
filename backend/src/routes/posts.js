// backend/src/routes/posts.js
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { protect } = require('../middleware/auth')

// Import models
const Post = require('../models/Post')

// ✅ Register comments routes FIRST (nested under /api/posts/:postId/comments)
router.use('/:postId/comments', require('./comments'))

// 🎯 GET all posts with pagination, filtering, sorting
router.get('/', async (req, res, next) => {
  try {
    // === PAGINATION ===
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10))
    const skip = (page - 1) * limit

    // === FILTERING ===
    const { search, author, category } = req.query
    const filter = { published: true } // Only show published posts
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }
    if (author) filter.author = author
    if (category) filter.category = category

    // === SORTING ===
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      popular: { likes: -1 }
    }
    const sortBy = req.query.sort || 'newest'
    const sort = sortOptions[sortBy] || sortOptions.newest

    // === EXECUTE QUERY ===
    const posts = await Post.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email profile.firstName profile.lastName profile.county')
      .lean()

    const total = await Post.countDocuments(filter)

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
        limit,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    next(error)
  }
})

// 🎯 GET single post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, published: true })
      .populate('author', 'username email profile.firstName profile.lastName profile.county')
    
    if (!post) {
      return res.status(404).json({ success: false, error: { message: 'Post not found', code: 'NOT_FOUND' } })
    }

    res.status(200).json({ success: true, data: post })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: { message: 'Invalid post ID format', code: 'CAST_ERROR' } })
    }
    next(error)
  }
})

// 🎯 CREATE new post (protected route - auth middleware applied in app.js)
router.post('/',
  [
    body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
    body('content').trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: 'Validation failed', code: 'VALIDATION_ERROR', details: errors.array() } })
    }

    try {
      const post = await Post.create({
        ...req.body,
        author: req.user?._id, // Requires auth middleware to set req.user
        likes: 0
      })

      const populatedPost = await Post.findById(post._id).populate('author', 'username email profile.firstName profile.lastName')
      res.status(201).json({ success: true, data: populatedPost })
    } catch (error) {
      next(error)
    }
  }
)

// 🎯 UPDATE post (protected route - author-only authorization handled in controller/middleware)
router.put('/:id',
  [
    body('title').optional().trim().isLength({ min: 3, max: 200 }),
    body('content').optional().trim().isLength({ min: 10 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: 'Validation failed', code: 'VALIDATION_ERROR', details: errors.array() } })
    }

    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id, author: req.user?._id }, // Only allow author to update
        { $set: req.body },
        { new: true, runValidators: true }
      ).populate('author', 'username email profile.firstName profile.lastName')

      if (!post) {
        return res.status(404).json({ success: false, error: { message: 'Post not found or not authorized', code: 'NOT_FOUND' } })
      }

      res.status(200).json({ success: true, data: post })
    } catch (error) {
      next(error)
    }
  }
)

// 🎯 DELETE post (soft delete - protected route)
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user?._id }, // Only allow author to delete
      { $set: { published: false, deletedAt: new Date() } }, // Soft delete via published flag
      { new: true }
    )

    if (!post) {
      return res.status(404).json({ success: false, error: { message: 'Post not found or not authorized', code: 'NOT_FOUND' } })
    }

    res.status(200).json({ success: true, message: 'Post deleted successfully', data: { id: post._id } })
  } catch (error) {
    next(error)
  }
})

// 🎯 VOTE on post (upvote/downvote - protected route)
router.post('/:id/vote', protect, async (req, res, next) => {
  try {
    const { voteType } = req.body
    
    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ success: false, error: { message: 'Invalid vote type', code: 'VALIDATION_ERROR' } })
    }

    const post = await Post.findById(req.params.id)
    
    if (!post) {
      return res.status(404).json({ success: false, error: { message: 'Post not found', code: 'NOT_FOUND' } })
    }

    await post.vote(req.user._id, voteType)
    
    // Re-fetch with populated author
    const updatedPost = await Post.findById(post._id)
      .populate('author', 'username email profile.firstName profile.lastName profile.avatar')

    res.status(200).json({ success: true, data: updatedPost })
  } catch (error) {
    next(error)
  }
})

// 🔖 BOOKMARK/UNBOOKMARK post (protected route)
router.post('/:id/bookmark', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    
    if (!post) {
      return res.status(404).json({ success: false, error: { message: 'Post not found', code: 'NOT_FOUND' } })
    }

    await post.toggleBookmark(req.user._id)
    
    const updatedPost = await Post.findById(post._id)
      .populate('author', 'username email profile.firstName profile.lastName profile.avatar')

    res.status(200).json({ 
      success: true, 
      data: updatedPost,
      bookmarked: updatedPost.bookmarkedBy.includes(req.user._id)
    })
  } catch (error) {
    next(error)
  }
})

// 🔗 SHARE post (increment share count)
router.post('/:id/share', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    
    if (!post) {
      return res.status(404).json({ success: false, error: { message: 'Post not found', code: 'NOT_FOUND' } })
    }

    await post.incrementShares()
    
    res.status(200).json({ success: true, shares: post.shares })
  } catch (error) {
    next(error)
  }
})

// 🔥 GET trending posts (most engagement)
router.get('/trending', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const trendingPosts = await Post.getTrending(limit)
    
    // Populate author information
    const populatedPosts = await Post.populate(trendingPosts, {
      path: 'author',
      select: 'username email profile.firstName profile.lastName profile.avatar'
    })

    res.status(200).json({ success: true, data: populatedPosts })
  } catch (error) {
    next(error)
  }
})

module.exports = router
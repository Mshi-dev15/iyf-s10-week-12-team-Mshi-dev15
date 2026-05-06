<<<<<<< HEAD
const express = require('express')
const router = express.Router()
router.get('/', (req, res) => res.json({ posts: [] }))
module.exports = router
=======
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Import models
const Post = require('../models/Post');

// 🎯 GET all posts with pagination, filtering, sorting
router.get('/', async (req, res, next) => {
  try {
    // === PAGINATION ===
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    // === FILTERING ===
    const { search, author, category } = req.query;
    const filter = { deleted: false };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    if (author) filter.author = author;
    if (category) filter.category = category;

    // === SORTING ===
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      popular: { likes: -1 }
    };
    const sortBy = req.query.sort || 'newest';
    const sort = sortOptions[sortBy] || sortOptions.newest;

    // === EXECUTE QUERY ===
    const posts = await Post.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email')
      .lean();

    const total = await Post.countDocuments(filter);

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
    });
  } catch (error) {
    next(error);
  }
});

// 🎯 GET single post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, deleted: false })
      .populate('author', 'name email');
    
    if (!post) {
      return res.status(404).json({ success: false, error: { message: 'Post not found' } });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: { message: 'Invalid post ID format' } });
    }
    next(error);
  }
});

// 🎯 CREATE new post
router.post('/',
  [
    body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
    body('content').trim().isLength({ min: 10, max: 10000 }).withMessage('Content must be 10-10000 characters'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: 'Validation failed', details: errors.array() } });
    }

    try {
      const post = await Post.create({
        ...req.body,
        author: req.user?._id || '650000000000000000000000', // Fallback for testing
        likes: 0
      });

      const populatedPost = await Post.findById(post._id).populate('author', 'name email');
      res.status(201).json({ success: true, data: populatedPost });
    } catch (error) {
      next(error);
    }
  }
);

// 🎯 UPDATE post
router.put('/:id',
  [
    body('title').optional().trim().isLength({ min: 3, max: 100 }),
    body('content').optional().trim().isLength({ min: 10, max: 10000 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: 'Validation failed', details: errors.array() } });
    }

    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id, deleted: false },
        { $set: req.body },
        { new: true, runValidators: true }
      ).populate('author', 'name email');

      if (!post) {
        return res.status(404).json({ success: false, error: { message: 'Post not found' } });
      }

      res.status(200).json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  }
);

// 🎯 DELETE post (soft delete)
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { $set: { deleted: true, deletedAt: new Date() } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, error: { message: 'Post not found' } });
    }

    res.status(200).json({ success: true, message: 'Post deleted successfully', data: { id: post._id } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
>>>>>>> origin/main

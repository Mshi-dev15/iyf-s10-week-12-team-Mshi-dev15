const express = require('express')
const router = express.Router()

// Comments routes (nested under /api/posts/:postId/comments)
router.use('/:postId/comments', require('./comments'))

// Posts routes
router.get('/', (req, res) => res.json({ posts: [] }))

module.exports = router
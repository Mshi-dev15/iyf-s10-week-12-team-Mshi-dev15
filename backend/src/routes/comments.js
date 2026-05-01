const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')
const { protect } = require('../middleware/auth')

// All routes are nested under /api/posts/:postId/comments

router.get('/', commentsController.getComments)
router.post('/', protect, commentsController.createComment)
router.delete('/:commentId', protect, commentsController.deleteComment)

module.exports = router
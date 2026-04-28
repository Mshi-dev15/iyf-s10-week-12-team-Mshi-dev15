const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')
const { protect } = require('../middleware/auth')
const { body, validationResult } = require('express-validator')

// Validation middleware
const validateComment = [
  body('content').trim().notEmpty().withMessage('Content required')
    .isLength({ max: 500 }).withMessage('Max 500 characters')
]

// Routes
router.get('/', commentsController.getComments)
router.post('/', protect, validateComment, (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}, commentsController.createComment)
router.delete('/:commentId', protect, commentsController.deleteComment)

module.exports = router
const { body, query, validationResult } = require('express-validator')
const { GIG_CATEGORIES, GIG_TYPES, COMPENSATION_TYPES } = require('./enums')

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const messages = errors.array().map(e => e.msg)
    return res.status(400).json({
      success: false,
      error: { message: 'Validation failed', code: 'VALIDATION_ERROR', details: messages }
    })
  }
  next()
}

const registerValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
   body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  
    // ✅ Nested profile fields (matches your frontend structure)
  body('profile.firstName').trim().notEmpty().withMessage('First name is required'),
  body('profile.firstName').trim().notEmpty().withMessage('First name is required'),
  body('profile.lastName').trim().notEmpty().withMessage('Last name is required'),
  body('profile.county').trim().notEmpty().withMessage('County is required'),
  body('role').optional().isIn(['youth', 'organization']).withMessage('Role must be youth or organization'),
  handleValidationErrors
]

const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
]

const createGigValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 120 }).withMessage('Title too long'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(GIG_CATEGORIES).withMessage('Invalid category'),
  body('gigType').isIn(GIG_TYPES).withMessage('Invalid gig type'),
  body('location.county').trim().notEmpty().withMessage('County is required'),
  body('location.town').trim().notEmpty().withMessage('Town is required'),
  body('schedule.startDate').isISO8601().withMessage('Valid start date is required'),
  body('schedule.deadline').isISO8601().withMessage('Valid deadline is required'),
  body('compensation.type').isIn(COMPENSATION_TYPES).withMessage('Invalid compensation type'),
  body('compensation.amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  handleValidationErrors
]

const applyGigValidator = [
  body('message').optional().trim().isLength({ max: 1000 }).withMessage('Message too long'),
  body('proposedRate').optional().isFloat({ min: 0 }).withMessage('Proposed rate must be positive'),
  handleValidationErrors
]

const getGigsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('lat').optional().isFloat().withMessage('Latitude must be a number'),
  query('lng').optional().isFloat().withMessage('Longitude must be a number'),
  query('radius').optional().isInt({ min: 1, max: 500 }).withMessage('Radius must be between 1 and 500 km'),
  handleValidationErrors
]

module.exports = {
  handleValidationErrors,
  registerValidator,
  loginValidator,
  createGigValidator,
  applyGigValidator,
  getGigsValidator
}
const express = require('express')
const router = express.Router()

const { register, login, getMe, updateProfile } = require('../controllers/authController')
const { protect } = require('../middleware/auth')

// Optional: Add validators if the file exists (safe fallback if missing)
let registerValidator, loginValidator
try {
  const validators = require('../utils/validators')
  registerValidator = validators.registerValidator || ((req, res, next) => next())
  loginValidator = validators.loginValidator || ((req, res, next) => next())
} catch (e) {
  // If validators don't exist, use no-op middleware
  registerValidator = (req, res, next) => next()
  loginValidator = (req, res, next) => next()
}

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', registerValidator, register)

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginValidator, login)

// @route   GET /api/auth/me
// @desc    Get current user (protected)
router.get('/me', protect, getMe)

// @route   PUT /api/auth/me
// @desc    Update user profile (protected)
// Note: Using /me for consistency with GET; change to /profile if preferred
router.put('/me', protect, updateProfile)

module.exports = router
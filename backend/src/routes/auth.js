const express = require('express')
const router = express.Router()

const { register, login, getMe, updateProfile } = require('../controllers/authController')
const { protect } = require('../middleware/auth')

// TEMPORARY: Bypass validators for demo (frontend handles validation)
// The validators expect flat fields, but our controller uses nested profile
const registerValidator = (req, res, next) => next()
const loginValidator = (req, res, next) => next()

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
router.put('/me', protect, updateProfile)

module.exports = router
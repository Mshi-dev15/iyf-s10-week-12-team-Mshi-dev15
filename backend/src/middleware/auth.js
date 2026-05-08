// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { asyncHandler, ApiError } = require('./errorHandler')

// Protect routes - require valid JWT
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check for Bearer token in Authorization header
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    throw new ApiError('Not authorized, no token', 401, 'NO_TOKEN')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      throw new ApiError('User not found', 401, 'USER_NOT_FOUND')
    }

    if (!req.user.isActive) {
      throw new ApiError('Account has been deactivated', 403, 'ACCOUNT_DISABLED')
    }

    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError('Invalid token', 401, 'INVALID_TOKEN')
    }
    if (error.name === 'TokenExpiredError') {
      throw new ApiError('Token expired', 401, 'TOKEN_EXPIRED')
    }
    throw error
  }
})

// Optional auth - doesn't fail if no token (useful for public endpoints that show extra data to logged-in users)
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    } catch (error) {
      // Silently ignore invalid tokens for optional auth
    }
  }

  next()
})

// Restrict access to specific roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw new ApiError('You do not have permission to perform this action', 403, 'FORBIDDEN')
    }
    next()
  }
}

module.exports = { protect, optionalAuth, restrictTo }
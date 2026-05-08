// backend/src/middleware/errorHandler.js

// Custom error class for API errors
class ApiError extends Error {
  constructor(message, statusCode, code) {
    super(message)
    this.statusCode = statusCode
    this.code = code || 'INTERNAL_ERROR'
    this.isOperational = true // Distinguish from programming errors
    Error.captureStackTrace(this, this.constructor)
  }
}

// Async error wrapper to avoid try/catch in every route
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({
      success: false,
      error: { message: 'Validation failed', code: 'VALIDATION_ERROR', details: messages }
    })
  }

  // Mongoose cast error (invalid ID format)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid ' + err.path + ': ' + err.value, code: 'CAST_ERROR' }
    })
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({
      success: false,
      error: { message: field + ' already exists', code: 'DUPLICATE_ERROR' }
    })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: { message: 'Invalid token', code: 'INVALID_TOKEN' }
    })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: { message: 'Token expired', code: 'TOKEN_EXPIRED' }
    })
  }

  // Default error response
  const statusCode = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Internal server error'
  const code = err.code || 'INTERNAL_ERROR'

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}

module.exports = errorHandler
module.exports.ApiError = ApiError
module.exports.asyncHandler = asyncHandler
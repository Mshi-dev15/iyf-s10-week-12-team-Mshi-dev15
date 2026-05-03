// Custom error class for API errors
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
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
    return res.status(400).json({ error: { message: 'Validation failed', details: messages } })
  }
  
  // Mongoose cast error (invalid ID format)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: { message: `Invalid ${err.path}: ${err.value}` } })
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ error: { message: `${field} already exists` } })
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: { message: 'Invalid token' } })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: { message: 'Token expired' } })
  }
  
  // Default error response
  const statusCode = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Internal server error'
  
  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}


module.exports = errorHandler
module.exports.ApiError = ApiError
module.exports.asyncHandler = asyncHandler

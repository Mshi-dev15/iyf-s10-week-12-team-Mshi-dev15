const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Protect routes - require valid JWT
const protect = async (req, res, next) => {
  try {
    let token
    
    // Check for Bearer token in Authorization header
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }
    
    if (!token) {
      res.status(401)
      throw new Error('Access denied. No token provided.')
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Get user from token (exclude password)
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user) {
      res.status(401)
      throw new Error('User no longer exists')
    }
    
    // Attach user to request object
    req.user = user
    next()
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401)
      throw new Error('Invalid token')
    }
    if (error.name === 'TokenExpiredError') {
      res.status(401)
      throw new Error('Token expired')
    }
    next(error)
  }
}

// Optional auth - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token
    
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    }
    
    next()
  } catch (error) {
    // Continue without user if token is invalid
    next()
  }
}

// Restrict access to specific roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403)
      throw new Error('You do not have permission to perform this action')
    }
    next()
  }
}

module.exports = { protect, optionalAuth, restrictTo }

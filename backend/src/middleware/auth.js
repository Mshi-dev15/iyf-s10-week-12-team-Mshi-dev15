const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { asyncHandler, ApiError } = require('./errorHandler')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    throw new ApiError('Not authorized, no token', 401, 'NO_TOKEN')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id).select('-password')

  if (!req.user) {
    throw new ApiError('User not found', 401, 'USER_NOT_FOUND')
  }

  if (!req.user.isActive) {
    throw new ApiError('Account has been deactivated', 403, 'ACCOUNT_DISABLED')
  }

  next()
})

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError('You do not have permission to perform this action', 403, 'FORBIDDEN')
    }
    next()
  }
}

module.exports = { protect, restrictTo }
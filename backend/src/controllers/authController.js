const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { asyncHandler, ApiError } = require('../middleware/errorHandler')

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password, bio, location, skills } = req.body
  
  // Validate required fields
  if (!username || !email || !password) {
    throw new ApiError('Username, email, and password are required', 400, 'VALIDATION_ERROR')
  }
  
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  })
  
  if (existingUser) {
    throw new ApiError('User with this email or username already exists', 400, 'DUPLICATE_USER')
  }
  
  // Create user (password will be hashed by pre-save middleware)
  const user = await User.create({
    username,
    email,
    password,
    bio,
    location,
    skills
  })
  
  // Generate token
  const token = generateToken(user._id)
  
  // Send response (exclude password)
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      skills: user.skills,
      token
    }
  })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  // Validate input
  if (!email || !password) {
    throw new ApiError('Please provide email and password', 400, 'VALIDATION_ERROR')
  }
  
  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password')
  
  if (!user) {
    throw new ApiError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
  }
  
  // Check if password matches
  const isMatch = await user.comparePassword(password)
  
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
  }
  
  // Generate token
  const token = generateToken(user._id)
  
  // Send response
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      skills: user.skills,
      token
    }
  })
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  
  res.json({
    success: true,
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      skills: user.skills,
      createdAt: user.createdAt
    }
  })
})

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { username, email, bio, location, skills } = req.body
  
  // Only allow updating specific fields (security best practice)
  const allowedUpdates = ['username', 'email', 'bio', 'location', 'skills']
  const updates = {}
  
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key]
    }
  })
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password')
  
  if (!user) {
    throw new ApiError('User not found', 404, 'NOT_FOUND')
  }
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  })
})

// Export all functions
module.exports = { register, login, getMe, updateProfile }
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { asyncHandler } = require('../middleware/errorHandler')


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
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, bio, location, skills } = req.body
  
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  })
  
  if (existingUser) {
    res.status(400)
    throw new Error('User with this email or username already exists')
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
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      skills: user.skills
    }
  })
})


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  // Validate input
  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide email and password')
  }
  
  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password')
  
  if (!user) {
    res.status(401)
    throw new Error('Invalid credentials')
  }
  
  // Check if password matches
  const isMatch = await user.comparePassword(password)
  
  if (!isMatch) {
    res.status(401)
    throw new Error('Invalid credentials')
  }
  
  // Generate token
  const token = generateToken(user._id)
  
  // Send response
  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      skills: user.skills
    }
  })
})


// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  
  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    bio: user.bio,
    location: user.location,
    skills: user.skills,
    createdAt: user.createdAt
  })
})


// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const { username, email, bio, location, skills } = req.body
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { username, email, bio, location, skills },
    { new: true, runValidators: true }
  ).select('-password')
  
  res.json({
    message: 'Profile updated successfully',
    user
  })
})

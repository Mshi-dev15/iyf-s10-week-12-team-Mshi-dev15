const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { asyncHandler, ApiError } = require('../middleware/errorHandler')

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

const buildAuthUser = (user, token) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  profile: user.profile,
  ...(token && { token })
})

const buildAuthPayload = (user, token) => {
  const authUser = buildAuthUser(user, token)

  return {
    token,
    user: authUser,
    data: authUser
  }
}

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    role,
    bio,
    skills,
    profile,
    firstName,
    lastName,
    county,
    town,
    phone
  } = req.body

  if (!username || !email || !password) {
    throw new ApiError('Username, email, and password are required', 400, 'VALIDATION_ERROR')
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  })

  if (existingUser) {
    throw new ApiError('User with this email or username already exists', 400, 'DUPLICATE_USER')
  }

  const userProfile = {
    ...profile,
    firstName: profile?.firstName || firstName || username,
    lastName: profile?.lastName || lastName || 'Member',
    county: profile?.county || county,
    town: profile?.town || town || '',
    phone: profile?.phone || phone || '',
    bio: profile?.bio || bio || '',
    skills: profile?.skills || skills || []
  }

  const user = await User.create({
    username,
    email,
    password,
    role: role === 'organization' ? 'organization' : 'youth',
    profile: userProfile
  })

  const token = generateToken(user._id)

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    ...buildAuthPayload(user, token)
  })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError('Please provide email and password', 400, 'VALIDATION_ERROR')
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new ApiError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
  }

  const token = generateToken(user._id)

  res.json({
    success: true,
    message: 'Login successful',
    ...buildAuthPayload(user, token)
  })
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id || req.user._id)

  if (!user) {
    throw new ApiError('User not found', 404, 'NOT_FOUND')
  }

  res.json({
    success: true,
    data: {
      ...buildAuthUser(user),
      createdAt: user.createdAt
    },
    user: {
      ...buildAuthUser(user),
      createdAt: user.createdAt
    }
  })
})

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const allowedUpdates = ['username', 'email', 'profile']
  const updates = {}

  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key]
    }
  })

  const user = await User.findByIdAndUpdate(
    req.user.id || req.user._id,
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

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
})

module.exports = { register, login, getMe, updateProfile, logout }

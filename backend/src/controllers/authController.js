const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { asyncHandler, ApiError } = require('../middleware/errorHandler')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' })
}

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, county, town, phone, role } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new ApiError('Email already registered', 400, 'DUPLICATE_EMAIL')
  }

  const user = await User.create({
    email,
    password,
    role: role || 'youth',
    profile: { firstName, lastName, county, town, phone }
  })

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile,
      token: generateToken(user._id)
    }
  })
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new ApiError('Invalid email or password', 401, 'INVALID_CREDENTIALS')
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new ApiError('Invalid email or password', 401, 'INVALID_CREDENTIALS')
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile,
      token: generateToken(user._id)
    }
  })
})

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json({ success: true, data: user })
})

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = [
    'profile.firstName', 'profile.lastName', 'profile.phone',
    'profile.bio', 'profile.skills', 'profile.interests',
    'profile.county', 'profile.town', 'profile.neighborhood',
    'profile.education', 'profile.socials', 'preferences'
  ]

  const updates = {}
  Object.keys(req.body).forEach(key => {
    if (allowedFields.includes(key)) {
      updates[key] = req.body[key]
    }
  })

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true }
  )

  res.json({ success: true, data: user })
})

module.exports = { register, login, getMe, updateProfile }
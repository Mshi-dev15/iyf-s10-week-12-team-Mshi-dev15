const User = require('../models/User')
const { asyncHandler, ApiError } = require('../middleware/errorHandler')

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -email -isActive -preferences')
  if (!user) throw new ApiError('User not found', 404, 'NOT_FOUND')
  res.json({ success: true, data: user })
})

const searchUsers = asyncHandler(async (req, res) => {
  const { search, county, skill, page = 1, limit = 20 } = req.query

  const query = { isActive: true, role: 'youth' }

  if (county) query['profile.county'] = county
  if (skill) query['profile.skills'] = { $in: [new RegExp(skill, 'i')] }

  if (search) {
    query.$or = [
      { 'profile.firstName': { $regex: search, $options: 'i' } },
      { 'profile.lastName': { $regex: search, $options: 'i' } },
      { 'profile.bio': { $regex: search, $options: 'i' } }
    ]
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)

  const [users, total] = await Promise.all([
    User.find(query)
      .select('profile stats role createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ 'stats.rating': -1 }),
    User.countDocuments(query)
  ])

  res.json({
    success: true,
    data: users,
    meta: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) }
  })
})

module.exports = { getUserProfile, searchUsers }
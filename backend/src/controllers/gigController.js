const Gig = require('../models/Gig')
const User = require('../models/User')
const Application = require('../models/Application')
const { asyncHandler, ApiError } = require('../middleware/errorHandler')

const getGigs = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    county,
    town,
    gigType,
    compensation,
    lat,
    lng,
    radius = 50,
    sortBy = 'newest',
    page = 1,
    limit = 12
  } = req.query

  const query = { status: 'active' }

  if (category) query.category = category
  if (county) query['location.county'] = county
  if (town) query['location.town'] = town
  if (gigType) query.gigType = gigType
  if (compensation) query['compensation.type'] = compensation

  let geoQuery = {}
  if (lat && lng) {
    geoQuery = {
      'location.coordinates': {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius) * 1000
        }
      }
    }
  }

  if (search) {
    query.$text = { $search: search }
  }

  let sort = {}
  if (sortBy === 'newest') sort = { createdAt: -1 }
  else if (sortBy === 'popular') sort = { 'engagement.views': -1 }
  else if (sortBy === 'deadline') sort = { 'schedule.deadline': 1 }

  const skip = (parseInt(page) - 1) * parseInt(limit)

  const [gigs, total] = await Promise.all([
    Gig.find({ ...query, ...geoQuery })
      .populate('postedBy', 'profile.firstName profile.lastName profile.avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Gig.countDocuments({ ...query, ...geoQuery })
  ])

  res.json({
    success: true,
    data: gigs,
    meta: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit))
    }
  })
})

const getGigBySlug = asyncHandler(async (req, res) => {
  const gig = await Gig.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { 'engagement.views': 1 } },
    { new: true }
  ).populate('postedBy', 'profile.firstName profile.lastName profile.avatar profile.county profile.town stats.rating')

  if (!gig) throw new ApiError('Gig not found', 404, 'NOT_FOUND')

  let hasApplied = false
  let myApplication = null
  if (req.user) {
    const application = await Application.findOne({ gig: gig._id, applicant: req.user._id }).lean()
    hasApplied = !!application
    myApplication = application
  }

  res.json({
    success: true,
    data: { ...gig.toObject(), hasApplied, myApplication }
  })
})

const createGig = asyncHandler(async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    postedBy: req.user._id,
    organization: {
      name: req.body.organizationName || req.user.getFullName(),
      ...req.body.organization
    }
  })

  await User.findByIdAndUpdate(req.user._id, { $inc: { 'stats.gigsPosted': 1 } })

  res.status(201).json({ success: true, data: gig })
})

const updateGig = asyncHandler(async (req, res) => {
  let gig = await Gig.findById(req.params.id)
  if (!gig) throw new ApiError('Gig not found', 404, 'NOT_FOUND')

  if (gig.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized', 403, 'FORBIDDEN')
  }

  gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  res.json({ success: true, data: gig })
})

const deleteGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id)
  if (!gig) throw new ApiError('Gig not found', 404, 'NOT_FOUND')

  if (gig.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized', 403, 'FORBIDDEN')
  }

  await gig.deleteOne()
  res.json({ success: true, data: null })
})

const applyToGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id)
  if (!gig) throw new ApiError('Gig not found', 404, 'NOT_FOUND')

  if (gig.status !== 'active') {
    throw new ApiError('This gig is no longer accepting applications', 400, 'GIG_CLOSED')
  }

  if (gig.schedule.deadline < new Date()) {
    throw new ApiError('Application deadline has passed', 400, 'DEADLINE_PASSED')
  }

  const existing = await Application.findOne({ gig: req.params.id, applicant: req.user._id })
  if (existing) {
    throw new ApiError('You have already applied to this gig', 400, 'ALREADY_APPLIED')
  }

  const application = await Application.create({
    gig: req.params.id,
    applicant: req.user._id,
    message: req.body.message,
    proposedRate: req.body.proposedRate,
    resumeUrl: req.body.resumeUrl,
    portfolioUrl: req.body.portfolioUrl
  })

  await Gig.findByIdAndUpdate(req.params.id, { $inc: { 'engagement.applicationCount': 1 } })
  await User.findByIdAndUpdate(req.user._id, { $inc: { 'stats.gigsApplied': 1 } })

  res.status(201).json({ success: true, data: application })
})

const getMyPostedGigs = asyncHandler(async (req, res) => {
  const gigs = await Gig.find({ postedBy: req.user._id })
    .sort({ createdAt: -1 })

  res.json({ success: true, data: gigs })
})

const getGigApplications = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id)
  if (!gig) throw new ApiError('Gig not found', 404, 'NOT_FOUND')

  if (gig.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized', 403, 'FORBIDDEN')
  }

  const applications = await Application.find({ gig: req.params.id })
    .populate('applicant', 'profile.firstName profile.lastName profile.avatar profile.county profile.town stats.rating')
    .sort({ createdAt: -1 })

  res.json({ success: true, data: applications })
})

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, reviewNote } = req.body

  const application = await Application.findOneAndUpdate(
    { _id: req.params.applicationId, gig: req.params.id },
    { status, reviewNote, reviewedAt: new Date(), reviewedBy: req.user._id },
    { new: true }
  ).populate('applicant', 'email profile.firstName')

  if (!application) throw new ApiError('Application not found', 404, 'NOT_FOUND')

  if (status === 'accepted') {
    const gig = await Gig.findById(req.params.id)
    const acceptedCount = await Application.countDocuments({ gig: req.params.id, status: 'accepted' })
    if (gig.engagement.maxApplications && acceptedCount >= gig.engagement.maxApplications) {
      await Gig.findByIdAndUpdate(req.params.id, { status: 'filled' })
    }
  }

  res.json({ success: true, data: application })
})

module.exports = {
  getGigs,
  getGigBySlug,
  createGig,
  updateGig,
  deleteGig,
  applyToGig,
  getMyPostedGigs,
  getGigApplications,
  updateApplicationStatus
}

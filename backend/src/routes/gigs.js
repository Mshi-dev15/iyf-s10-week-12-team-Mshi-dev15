const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')
const {
  getGigs,
  getGigBySlug,
  createGig,
  updateGig,
  deleteGig,
  applyToGig,
  getMyPostedGigs,
  getGigApplications,
  updateApplicationStatus
} = require('../controllers/gigController')
const { createGigValidator, applyGigValidator, getGigsValidator } = require('../utils/validators')

router.get('/', getGigsValidator, getGigs)
router.get('/my-posts', protect, restrictTo('organization', 'admin'), getMyPostedGigs)
router.post('/', protect, restrictTo('organization', 'admin'), createGigValidator, createGig)
router.get('/:slug', getGigBySlug)
router.put('/:id', protect, restrictTo('organization', 'admin'), updateGig)
router.delete('/:id', protect, restrictTo('organization', 'admin'), deleteGig)
router.post('/:id/apply', protect, restrictTo('youth'), applyGigValidator, applyToGig)
router.get('/:id/applications', protect, restrictTo('organization', 'admin'), getGigApplications)
router.put('/:id/applications/:applicationId', protect, restrictTo('organization', 'admin'), updateApplicationStatus)

module.exports = router
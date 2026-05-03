const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  streamNotifications
} = require('../controllers/notificationController')

router.get('/', protect, getNotifications)
router.get('/stream', protect, streamNotifications)
router.put('/read-all', protect, markAllAsRead)
router.put('/:id/read', protect, markAsRead)

module.exports = router
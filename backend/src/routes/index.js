const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')
const gigRoutes = require('./gigs')
const userRoutes = require('./users')
const notificationRoutes = require('./notifications')
const messageRoutes = require('./messages')
const locationRoutes = require('./location')

router.use('/auth', authRoutes)
router.use('/gigs', gigRoutes)
router.use('/users', userRoutes)
router.use('/notifications', notificationRoutes)
router.use('/messages', messageRoutes)
router.use('/location', locationRoutes)

module.exports = router
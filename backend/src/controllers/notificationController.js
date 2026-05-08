const Notification = require('../models/Notification')
const { asyncHandler } = require('../middleware/errorHandler')

const getNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, unreadOnly = false } = req.query

  const query = { recipient: req.user._id }
  if (unreadOnly === 'true') query.isRead = false

  const skip = (parseInt(page) - 1) * parseInt(limit)

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Notification.countDocuments({ recipient: req.user._id }),
    Notification.countDocuments({ recipient: req.user._id, isRead: false })
  ])

  res.json({
    success: true,
    data: notifications,
    meta: { page: parseInt(page), limit: parseInt(limit), total, unreadCount }
  })
})

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { isRead: true, readAt: new Date() },
    { new: true }
  )
  res.json({ success: true, data: notification })
})

const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, isRead: false },
    { isRead: true, readAt: new Date() }
  )
  res.json({ success: true, data: null })
})

const streamNotifications = asyncHandler(async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const heartbeat = setInterval(() => res.write(':heartbeat\n\n'), 30000)

  const sendNotification = (notification) => {
    res.write('data: ' + JSON.stringify(notification) + '\n\n')
  }

  req.app.on('notification:' + req.user._id, sendNotification)

  req.on('close', () => {
    clearInterval(heartbeat)
    req.app.removeListener('notification:' + req.user._id, sendNotification)
  })
})

module.exports = { getNotifications, markAsRead, markAllAsRead, streamNotifications }
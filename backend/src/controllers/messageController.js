const Message = require('../models/Message')
const { asyncHandler, ApiError } = require('../middleware/errorHandler')

const sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, content, gigId } = req.body

  if (recipientId === req.user._id.toString()) {
    throw new ApiError('Cannot message yourself', 400, 'SELF_MESSAGE')
  }

  const message = await Message.create({
    sender: req.user._id,
    recipient: recipientId,
    content,
    gig: gigId || null
  })

  req.app.emit('notification:' + recipientId, {
    type: 'message',
    title: 'New message from ' + req.user.profile.firstName,
    body: content.substring(0, 100),
    data: { senderId: req.user._id, messageId: message._id }
  })

  res.status(201).json({ success: true, data: message })
})

const getConversation = asyncHandler(async (req, res) => {
  const { page = 1, limit = 30 } = req.query
  const skip = (parseInt(page) - 1) * parseInt(limit)

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, recipient: req.params.userId },
      { sender: req.params.userId, recipient: req.user._id }
    ],
    isDeleted: false
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('sender', 'profile.firstName profile.avatar')
    .populate('gig', 'title slug')

  await Message.updateMany(
    { sender: req.params.userId, recipient: req.user._id, readAt: { $exists: false } },
    { readAt: new Date() }
  )

  res.json({ success: true, data: messages.reverse() })
})

const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: req.user._id }, { recipient: req.user._id }],
        isDeleted: false
      }
    },
    {
      $project: {
        otherUser: {
          $cond: [{ $eq: ['$sender', req.user._id] }, '$recipient', '$sender']
        },
        content: 1,
        createdAt: 1,
        readAt: 1,
        sender: 1
      }
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: '$otherUser',
        lastMessage: { $first: '$$ROOT' },
        unreadCount: {
          $sum: {
            $cond: [
              { $and: [{ $ne: ['$sender', req.user._id] }, { $eq: ['$readAt', null] }] },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        'user.profile.firstName': 1,
        'user.profile.lastName': 1,
        'user.profile.avatar': 1,
        lastMessage: 1,
        unreadCount: 1
      }
    },
    { $sort: { 'lastMessage.createdAt': -1 } }
  ])

  res.json({ success: true, data: conversations })
})

module.exports = { sendMessage, getConversation, getConversations }
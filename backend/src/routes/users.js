const express = require('express')
const router = express.Router()
const { getUserProfile, searchUsers } = require('../controllers/userController')

router.get('/', searchUsers)
router.get('/:id', getUserProfile)

module.exports = router
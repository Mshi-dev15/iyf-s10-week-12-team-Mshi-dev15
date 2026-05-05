// backend/src/routes/index.js
// Main routes file — all routes connect here

const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));

module.exports = router;
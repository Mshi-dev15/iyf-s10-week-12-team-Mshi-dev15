const express = require('express');
const router = express.Router();

// Placeholder route so the app doesn't crash
router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Posts route ready' });
});

module.exports = router;
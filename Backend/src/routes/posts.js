// backend/src/routes/posts.js
// Placeholder posts route — Backend Person 5 will build the full version

const express = require('express');
const router = express.Router();

// GET /api/posts — returns empty array for now
router.get('/', (req, res) => {
    res.json({ 
        success: true,
        posts: [],
        message: 'BridgeKE opportunities endpoint ready'
    });
});

module.exports = router;
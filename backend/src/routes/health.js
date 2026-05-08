// backend/src/routes/health.js
// Health check endpoint — Render.com pings this to know if the server is alive

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    res.json({
        status: 'ok',
        message: '🇰🇪 CommunityHub Kenya API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

module.exports = router;
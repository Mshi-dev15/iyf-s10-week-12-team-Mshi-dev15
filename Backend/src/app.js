// backend/src/app.js
// Express app setup — CORS, middleware, and routes

const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
// Allows the React frontend to talk to this backend
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',   // Vite dev server
            'http://localhost:3000',   // Local
            process.env.FRONTEND_URL  // Production frontend
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// ── Body Parser ───────────────────────────────────────────────────────────────
// Lets Express read JSON from request bodies
app.use(express.json());

// ── Logger Middleware ─────────────────────────────────────────────────────────
app.use(logger);

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({ message: '🇰🇪 Welcome to CommunityHub Kenya API' });
});

app.get('/about', (req, res) => {
    res.json({
        name: 'CommunityHub Kenya',
        version: '1.0.0',
        description: 'Connecting Kenyan youth with local opportunities'
    });
});

// Health check
app.use('/api/health', require('./routes/health'));

// Other routes (teammates will add these)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/opportunities', require('./routes/opportunities'));
// app.use('/api/comments', require('./routes/comments'));
app.use('/api', require('./routes'));

// ── Error Handler ─────────────────────────────────────────────────────────────
// Must be last — catches all errors from routes above
app.use(notFound);
app.use(errorHandler);

module.exports = app;
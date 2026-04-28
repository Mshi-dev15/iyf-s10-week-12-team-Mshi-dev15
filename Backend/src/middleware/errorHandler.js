// backend/src/middleware/errorHandler.js
// B1 Task — 404 handler and global error middleware
// This must always be the LAST middleware in app.js

// ── 404 Handler ───────────────────────────────────────────────────────────────
// Catches any request that didn't match a route above
const notFound = (req, res, next) => {
    const error = new Error(`❌ Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error); // pass to the error handler below
};

// ── Global Error Handler ──────────────────────────────────────────────────────
// Catches all errors thrown anywhere in the app
// Express knows this is an error handler because it has 4 parameters (err, req, res, next)
const errorHandler = (err, req, res, next) => {
    // Sometimes an error is thrown but status is still 200 — fix that
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: Object.values(err.errors).map((e) => e.message).join(', ')
        });
    }

    // Handle Mongoose duplicate key errors (e.g. email already exists)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            error: `${field} already exists`
        });
    }

    // Handle Mongoose CastError (e.g. invalid MongoDB ID)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: 'Invalid ID format'
        });
    }

    // Generic error response
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Something went wrong',
        // Only show full error stack in development — never in production
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = { notFound, errorHandler };
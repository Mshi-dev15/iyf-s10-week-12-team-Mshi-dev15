// backend/server.js
// Entry point — validates env variables, connects to MongoDB, starts the server

require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./src/app');

// ── Validate Required Environment Variables ───────────────────────────────────
// If these are missing the app won't work — better to crash early with a clear
// error than fail silently later
const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];

for (const varName of requiredVars) {
    if (!process.env[varName]) {
        console.error(`❌ Error: ${varName} environment variable is required`);
        process.exit(1);
    }
}

const PORT = process.env.PORT || 3000;

// ── Connect to MongoDB then Start Server ──────────────────────────────────────
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 CommunityHub Kenya API running on port ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
        console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
    });
});
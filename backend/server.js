// backend/server.js
require('dotenv').config()

// Validate required environment variables (production safety)
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET']
const missing = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missing.length > 0) {
  console.error('❌ FATAL: Missing required environment variables:')
  missing.forEach(v => console.error('   - ' + v))
  console.error('💡 Copy .env.example to .env and fill in the values')
  process.exit(1)
}

const app = require('./src/app')
const connectDB = require('./src/config/database')

const PORT = process.env.PORT || 3000

// Connect to DB with graceful fallback for development
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('✅ Server running on port ' + PORT)
      console.log('🌐 Environment: ' + process.env.NODE_ENV)
      console.log('🔗 Connected to MongoDB')
    })
  })
  .catch(err => {
    // In production: fail hard; in dev: warn and continue
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Failed to connect to MongoDB:', err.message)
      process.exit(1)
    } else {
      console.warn('⚠️  MongoDB connection failed, starting server without database...')
      console.warn('   To fix: Update MONGODB_URI in backend/.env')
      app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT} (without database)`)
        console.log(`🌐 Environment: ${process.env.NODE_ENV}`)
      })
    }
  })
require('dotenv').config()

// Validate required environment variables
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

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('✅ Server running on port ' + PORT)
    console.log('🌐 Environment: ' + process.env.NODE_ENV)
  })
}).catch(err => {
  console.error('❌ Failed to start server:', err)
  process.exit(1)
})
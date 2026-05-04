require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/database')

const PORT = process.env.PORT || 3000

// Try to connect to DB, but start server even if it fails (for development)
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`)
  })
}).catch(err => {
  console.warn('⚠️  MongoDB connection failed, starting server without database...')
  console.warn('   To fix: Update MONGODB_URI in backend/.env with your MongoDB connection string')
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} (without database)`)
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`)
  })
})

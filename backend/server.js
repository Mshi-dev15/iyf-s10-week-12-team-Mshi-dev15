require('dotenv').config()
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
// backend/src/config/database.js
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Modern Mongoose (7+) doesn't need deprecated options
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    // In production: fail fast; in dev: you can comment out throw to continue
    throw error
  }
}

module.exports = connectDB
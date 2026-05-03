const express = require('express')
const cors = require('cors')


const errorHandler = require('./middleware/errorHandler')
const authRoutes = require('./routes/auth')


const app = express()


// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',  // Vite dev
      'http://localhost:3000',  // Local
      process.env.FRONTEND_URL  // Production
    ].filter(Boolean)
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}


// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// API Routes
app.use('/api/auth', authRoutes)


// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  })
})


// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})


// Error Handler (must be last)
app.use(errorHandler)


module.exports = app

const express = require('express')
const cors = require('cors')
const path = require('path')

const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes')

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
app.use(logger)

// API Routes
app.use('/api', routes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  })
})

// Serve static files in production (optional monorepo setup)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
  })
}

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error Handler (must be last)
app.use(errorHandler)

module.exports = app

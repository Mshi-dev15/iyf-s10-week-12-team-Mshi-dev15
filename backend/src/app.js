// backend/src/app.js
const express = require('express')
const cors = require('cors')
const path = require('path')

// 🔐 Security & performance middleware
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')

const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const authRoutes = require('./routes/auth')
const routes = require('./routes') // General API routes (if they exist)

const app = express()

// 🔐 Security middleware
app.use(helmet())
app.use(compression())

// 🛡️ Rate limiting for API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, error: { message: 'Too many requests, please try again later.' } }
})
app.use('/api/', limiter)

// 🌐 CORS Configuration (enhanced)
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
app.use(cors(corsOptions))

// 📦 Body parsing with limits
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 🪵 Logging middleware
app.use(logger)

// 🛣️ API Routes
app.use('/api/auth', authRoutes)  // ← Auth routes (registration, login, me)
app.use('/api', routes)           // ← General API routes (posts, users, etc.)

// 💓 Health check (consistent format)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV
    }
  })
})

// 🗂️ Serve static files in production (frontend deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
  })
}

// ❌ 404 Handler (consistent format)
app.use((req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found' } })
})

// ⚠️ Error Handler (MUST be last)
app.use(errorHandler)

module.exports = app
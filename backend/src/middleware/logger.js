// backend/src/middleware/logger.js
// Logs incoming requests and response status with timing

const logger = (req, res, next) => {
  const start = Date.now()
  
  // Log incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  
  // Log response when finished (includes status code + duration)
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`)
  })
  
  next()
}

module.exports = logger
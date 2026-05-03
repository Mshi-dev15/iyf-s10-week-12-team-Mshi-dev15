// backend/src/middleware/logger.js
// B1 Task — Logs every incoming request with method, URL, timestamp and response time

const logger = (req, res, next) => {
    const start = Date.now();

    // When the response finishes, log the details
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
        );
    });

    next(); // move on to the next middleware or route
};

module.exports = logger;
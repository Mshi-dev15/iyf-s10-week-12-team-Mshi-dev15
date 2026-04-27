const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./src/routes/authRoutes'); // Make sure path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mount your routes
app.use('/api/auth', authRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

module.exports = app;
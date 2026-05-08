// backend/config/db.js
// B3 Task — MongoDB connection utility
// Every other file imports this to connect to the database

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection failed: ${error.message}`);
        process.exit(1);                          // stop the server if DB fails
    }
};

module.exports = connectDB;
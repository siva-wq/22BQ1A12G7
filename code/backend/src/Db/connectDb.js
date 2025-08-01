// src/config/db.js
const mongoose = require('mongoose');
//UyJKR7aLRZ9RD0Oz
const connectDB = async () => {
  try {
    await mongoose.connect('db url', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

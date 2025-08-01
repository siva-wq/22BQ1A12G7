// src/config/db.js
const mongoose = require('mongoose');
//UyJKR7aLRZ9RD0Oz
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://vullangulavenkatasivagangadhar:UyJKR7aLRZ9RD0Oz@cluster0.wpmlt8r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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

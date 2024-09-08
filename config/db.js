const mongoose = require('mongoose');

const connectDB = async () => {
   console.error('connectDB called');
   try {
    await mongoose.connect('mongodb://127.0.0.1:27017/QuiltersLibrary', { 
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;

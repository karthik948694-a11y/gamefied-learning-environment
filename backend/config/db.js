const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Modern mongoose doesn't need these but good to be explicit
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} → DB: "${conn.connection.name}"`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.error('   Make sure MongoDB is running: "mongod" or start the MongoDB service');
    process.exit(1);
  }
};

module.exports = connectDB;

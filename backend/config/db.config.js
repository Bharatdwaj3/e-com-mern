const mongoose = require('mongoose');
const { MONGO_URI } = require('./env.config');

const connectDB = async () => {
  await mongoose.connect(MONGO_URI, {
    bufferTimeoutMS: 30000,
    serverSelectionTimeoutMS: 30000,
  });
  return new Promise((resolve) => {
    mongoose.connection.once('open', resolve);
  });
};

module.exports = connectDB;
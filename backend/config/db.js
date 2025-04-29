const mongoose = require('mongoose');
const { Pool } = require('pg');
require('dotenv').config(); 

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log('PostgreSQL Connected'))
  .catch(err => console.error('PostgreSQL connection error', err, process.env.POSTGRES_URI));

module.exports = { connectMongoDB, pool };

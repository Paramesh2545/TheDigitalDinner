require('dotenv').config(); // Load environment variables
const { Pool } = require('pg');

// Create a new pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test query
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected successfully at:', result.rows[0].now);
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error);
    process.exit(1); // Exit with failure
  }
};

testConnection();

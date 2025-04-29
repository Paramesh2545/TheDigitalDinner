const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectMongoDB } = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// CORS configuration with multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://the-digital-dinner-eta.vercel.app/', // Add your frontend Vercel URL
  process.env.FRONTEND_URL // Optional: Add from environment variable
];

app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

app.use(bodyParser.json());

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect databases
connectMongoDB();

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;


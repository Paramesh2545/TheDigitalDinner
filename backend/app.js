const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectMongoDB } = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: "https://the-digital-dinner-eta.vercel.app/",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running fine' });
});

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

connectMongoDB();

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


// Export for Vercel
module.exports = app;


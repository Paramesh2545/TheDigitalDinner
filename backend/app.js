const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectMongoDB } = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);

app.get('/test', (req, res) => {
  res.status(200).send('Test route successful');
});


// Connect databases
connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


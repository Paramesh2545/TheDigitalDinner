const { createOrder, getOrdersByPhone } = require('../models/Order');

const placeOrder = async (req, res) => {
  const { name, phone, orderDate } = req.body;
  const cart =req.body.items;
  console.log(req.body);
  if (!name || !phone || !cart) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const order = await createOrder(name, phone, cart, orderDate);
    return res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

const fetchOrders = async (req, res) => {
  console.log("came to fetchorders");
  const { phone } = req.params;
  try {
    const orders = await getOrdersByPhone(phone);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { placeOrder, fetchOrders };

const { pool } = require('../config/db');

const createOrder = async (name, phone, cart, orderdate) => {
  const query = `
    INSERT INTO orders (name, phone, cart, orderdate)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [name, phone, JSON.stringify(cart), new Date()];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getOrdersByPhone = async (phone) => {
  const query = `SELECT * FROM orders WHERE phone = $1;`;
  const result = await pool.query(query, [phone]);
  return result.rows;
};

module.exports = { createOrder, getOrdersByPhone };
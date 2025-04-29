const express = require('express');
const { placeOrder, fetchOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', placeOrder);
router.get('/:phone', fetchOrders);

module.exports = router;

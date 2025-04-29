const express = require('express');
const { getMenuItems, postMenuItems } = require('../controllers/menuController');
const router = express.Router();

router.get('/', getMenuItems);
router.post('/', postMenuItems);

module.exports = router;

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;

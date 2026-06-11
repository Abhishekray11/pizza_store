const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['pizza', 'sides', 'beverages', 'combo', 'new launches', 'bestsellers'],
    required: true
  },
  description: { type: String, required: true },
  image: {
    type: String,
    required: false,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
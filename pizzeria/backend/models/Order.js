const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  deliveryMode: { type: String, enum: ['Delivery', 'Takeaway'] },
  paymentOption: { type: String, enum: ['UPI', 'Card', 'COD'] },
  status: { type: String, enum: ['Pending', 'Accepted', 'Dispatched', 'Rejected', 'Cancelled'] },
  paymentStatus: {type: String, enum: ['Pending','Paid','Failed' ], default: 'Pending'}
},{ timestamps: true });


module.exports = mongoose.model('Order', OrderSchema);

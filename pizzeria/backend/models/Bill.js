const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    tax: {
        type: Number,
        required: true
    },

    totalBill: {
        type: Number,
        required: true
    },

    generatedDate: {
        type: Date,
        default: Date.now
    }

},
{
    timestamps: true
});

module.exports =
    mongoose.model(
        'Bill',
        BillSchema
    );
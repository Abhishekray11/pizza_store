const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },

    message: {
        type: String,
        required: true,
    },

    isRead: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "Notification",
    NotificationSchema
);
const Order = require('../models/Order');
const User = require('../models/User');
const MessageService =require('./MessageService');
const PaymentService = require('./PaymentService');

class OrderService {


    async createOrder(userId, data) {
    try {
        console.log("USER ID:", userId);
        console.log("ORDER DATA:", data);

        if (
            !PaymentService.validateMode(
                data.paymentOption
            )
        ) {
            throw new Error(
                "Invalid payment mode"
            );
        }

        
        const order = new Order({

        userId,

        items: data.items.map(item => ({
            _id: item._id || item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),

        totalAmount:
            data.totalAmount,

        deliveryMode:
            data.deliveryMode,

        paymentOption:
            data.paymentOption,

        status:
            'Pending'
    });

        await order.save();

        console.log(
            "ORDER SAVED:",
            order
        );

        const customer =
            await User.findById(
                userId
            );

        console.log(
            "CUSTOMER:",
            customer
        );

        if (customer) {

            MessageService.sendOrderCreated(
                customer.email,
                order._id
            );

        }

        return order;

    } catch (err) {

        console.log(
            "CREATE ORDER ERROR:",
            err
        );

        throw err;

    }
}


    async getMyOrders(
        userId
    ) {

        return await Order.find({
            userId
        }).sort({
            createdAt: -1
        });

    }

    async cancelOrder(
        orderId,
        userId
    ) {

        const order =
            await Order.findOne({

                _id: orderId,

                userId

            });

        if (!order) {
            throw new Error(
                'Order not found'
            );
        }

        if (
            order.status !==
            'Pending'
        ) {

            throw new Error(
                'Cannot cancel order'
            );

        }

        order.status =
            'Cancelled';

        await order.save();

        return order;
    }


    async updateStatus(
    orderId,
    status
) {
   const validStatuses = [
    'Pending',
    'Accepted',
    'Preparing',
    'Out For Delivery',
    'Delivered',
    'Cancelled'
];

if (!validStatuses.includes(status)) {
  throw new Error("Invalid status");
}



    const order =
        await Order.findById(
            orderId
        );

    if (!order) {

        throw new Error(
            'Order not found'
        );

    }

    order.status = status;

    await order.save();

    const customer =
        await User.findById(
            order.userId
        );

    MessageService.sendOrderStatus(
        customer.email,
        status
    );

    return order;
}



async updatePaymentStatus(
    orderId,
    paymentStatus
) {

    const order =
        await Order.findById(
            orderId
        );

    if (!order) {

        throw new Error(
            'Order not found'
        );

    }

    order.paymentStatus =
        paymentStatus;

    await order.save();

    return order;
}
    
async getAllOrders() {

    return await Order.find()
        .sort({
            createdAt: -1
        });

}  

}

module.exports = new OrderService();
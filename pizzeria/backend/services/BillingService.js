const Bill =
    require('../models/Bill');

const Order =
    require('../models/Order');

class BillingService {

    async generateBill(
        orderId
    ) {

        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error(
                'Order not found'
            );
        }

        const existingBill =await Bill.findOne({orderId});

        if (existingBill) {
            throw new Error(
                'Bill already generated'
            );
        }

        const tax =
            Number(
                (
                    order.totalAmount *
                    0.18
                ).toFixed(2)
            );

        const totalBill =
            order.totalAmount +
            tax;

        const bill =
            new Bill({

                orderId:
                    order._id,

                customerId:
                    order.userId,

                amount:
                    order.totalAmount,

                tax,

                totalBill

            });

        await bill.save();

        return bill;
    }

    async getBills(
        customerId
    ) {

        return await Bill.find({

            customerId

        })
        .populate('orderId')
        .populate({
            path: 'customerId',
            select: 'name nameHindi username' // Populates name keys from your User model
        });
    }

}

module.exports = new BillingService();
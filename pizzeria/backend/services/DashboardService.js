const Bill = require('../models/Bill');
const Order = require("../models/Order");
class DashboardService {

    async getDashboardStats() {

        const totalOrders =
            await Order.countDocuments();

        const totalBills =
            await Bill.countDocuments();

        const revenueData =
            await Bill.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum:
                                '$totalBill'
                        }
                    }
                }
            ]);

        const totalRevenue =
            revenueData.length
                ? revenueData[0]
                    .totalRevenue
                : 0;

        return {

            totalOrders,

            totalBills,

            totalRevenue

        };
    }

async getMonthlyRevenue() {
  const data = await Bill.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$generatedDate" }
        },
        revenue: { $sum: "$totalBill" }
      }
    }
  ]);

  return data;
}

async getRecentOrders() {

  return await Order
    .find()
    .sort({
      createdAt: -1
    })
    .limit(5);

}

}

module.exports =  new DashboardService();
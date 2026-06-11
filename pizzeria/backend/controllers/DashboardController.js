const DashboardService = require('../services/DashboardService');

class DashboardController {

    async getStats(req, res) {
        try {
            const stats = await DashboardService.getDashboardStats();
            res.json(stats);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async getMonthlyRevenue(req, res) {
        try {
            const data = await DashboardService.getMonthlyRevenue();
            res.json(data);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async getRecentOrders(req, res) {
        try {
            const orders = await DashboardService.getRecentOrders();
            res.json(orders);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }
}

module.exports = new DashboardController();
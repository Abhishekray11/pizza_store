const OrderService = require('../services/OrderService');

class OrderController {

    async createOrder(req, res) {
        try {
            const order = await OrderService.createOrder(req.user.id, req.body);
            res.status(201).json(order);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const order = await OrderService.updatePaymentStatus(
                req.params.id,
                req.body.paymentStatus
            );

            res.json(order);

        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    }

    async getMyOrders(req, res) {
        try {
            const orders = await OrderService.getMyOrders(req.user.id);
            res.json(orders);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.json(orders);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async cancelOrder(req, res) {
        try {
            const order = await OrderService.cancelOrder(
                req.params.id,
                req.user.id
            );

            res.json(order);

        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    }

    async updateStatus(req, res) {
        try {
            const order = await OrderService.updateStatus(
                req.params.id,
                req.body.status
            );

            res.json(order);

        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    }
}

module.exports = new OrderController();
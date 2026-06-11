const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");
const DashboardController = require("../controllers/DashboardController");



/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Dashboard Statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard Data
 */
router.get("/stats", auth(["admin"]), DashboardController.getStats);


/**
 * @swagger
 * /api/dashboard/monthly-revenue:
 *   get:
 *     summary: Monthly Revenue Report
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly Revenue Data
 */
router.get("/monthly-revenue", auth(["admin"]), DashboardController.getMonthlyRevenue);



/**
 * @swagger
 * /api/dashboard/recent-orders:
 *   get:
 *     summary: Recent Orders
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent Orders List
 */
router.get("/recent-orders", auth(["admin"]), DashboardController.getRecentOrders);


/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Admin Order Management
 *     tags:
 *       - Admin Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All Orders
 */
router.get("/orders", auth(["admin"]), async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});



// UPDATE ORDER STATUS
/**
 * @swagger
 * /api/admin/orders/{id}:
 *   put:
 *     summary: Update Order From Dashboard
 *     tags:
 *       - Admin Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Accepted
 *     responses:
 *       200:
 *         description: Order Updated
 */
router.put("/orders/:id", auth(["admin"]), async (req, res) => {
  const { status } = req.body;

  const updated = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;

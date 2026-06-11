const express =  require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const OrderController =  require('../controllers/OrderController');


/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create Order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order Created
 */
router.post(
    '/',
    auth(['customer']),
    OrderController.createOrder
);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get All Orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All Orders
 */
router.get(
    '/',
    auth(['admin']),
    OrderController.getAllOrders
);



/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get Customer Orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order List
 */
router.get(
    '/my-orders',
    auth(['customer']),
    OrderController.getMyOrders
);


/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   post:
 *     summary: Cancel Order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order Cancelled
 */
router.post(
    '/:id/cancel',
    auth(['customer']),
    OrderController.cancelOrder
);



/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update Order Status
 *     tags:
 *       - Orders
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
 *         description: Status Updated
 */
router.put(
    '/:id/status',
    auth(['admin']),
    OrderController.updateStatus
);


/**
 * @swagger
 * /api/orders/{id}/payment-status:
 *   put:
 *     summary: Update Payment Status
 *     tags:
 *       - Orders
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
 *               paymentStatus:
 *                 type: string
 *                 example: Paid
 *     responses:
 *       200:
 *         description: Payment Updated
 */
router.put(
    '/:id/payment-status',
    auth(['admin']),
    OrderController.updatePaymentStatus
);


module.exports = router;
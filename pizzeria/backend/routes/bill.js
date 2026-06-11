const express = require('express');

const router = express.Router();

const auth =require('../middleware/auth');

const BillController =require('../controllers/BillController');



/**
 * @swagger
 * /api/bills/generate/{orderId}:
 *   post:
 *     summary: Generate Bill
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Bill Generated
 */
router.post(
    '/generate/:orderId',
    auth(['admin']),
    BillController.generateBill
);




/**
 * @swagger
 * /api/bills/my-bills:
 *   get:
 *     summary: Get Customer Bills
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bills List
 */
router.get(
    '/my-bills',
    auth(['customer']),
    BillController.getMyBills
);



/**
 * @swagger
 * /api/bills/invoice/{billId}:
 *   get:
 *     summary: Download Invoice PDF
 *     tags:
 *       - Billing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: billId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF Invoice
 */
router.get(
    '/invoice/:billId',
    auth(['customer','admin']),
    BillController.downloadInvoice
);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth =  require('../middleware/auth');
const MenuController = require('../controllers/MenuController');



/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get Menu Items
 *     tags:
 *       - Menu
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Menu List
 */
router.get(
    '/',
    auth(),
    MenuController.getMenu
);


/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add Menu Item
 *     description: Admin can add a new pizza, side, beverage, combo, bestseller, or new launch item.
 *     tags:
 *       - Menu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Veg Supreme Pizza
 *               price:
 *                 type: number
 *                 example: 299
 *               category:
 *                 type: string
 *                 enum:
 *                   - pizza
 *                   - sides
 *                   - beverages
 *                   - combo
 *                   - new launches
 *                   - bestsellers
 *                 example: pizza
 *               description:
 *                 type: string
 *                 example: Loaded with vegetables and extra cheese
 *               image:
 *                 type: string
 *                 example: https://example.com/pizza.jpg
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Server error
 */
router.post(
    '/',
    auth(['admin']),
    MenuController.addMenuItem
);


/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update Menu Item
 *     tags:
 *       - Menu
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu Updated
 */
router.put('/:id', auth(['admin']), MenuController.updateMenuItem);



/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete Menu Item
 *     tags:
 *       - Menu
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
 *         description: Menu Deleted
 */
router.delete('/:id', auth(['admin']), MenuController.deleteMenuItem);


module.exports = router;
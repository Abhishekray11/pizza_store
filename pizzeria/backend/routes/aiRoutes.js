const express = require("express");
const router = express.Router();

const pizzeriaAI = require("../controllers/aiAssistantController");


/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: AI Assistant Chat
 *     tags:
 *       - AI Assistant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI Response
 */
router.post("/chat", pizzeriaAI);

module.exports = router;
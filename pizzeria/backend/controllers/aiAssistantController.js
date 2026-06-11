const Order = require("../models/Order.js");
const Menu = require("../models/MenuItem.js");

const pizzeriaAI = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const msg = message.toLowerCase();

    let reply = "🤖 I didn't understand that. Try asking about orders or menu.";

    if (msg.includes("menu") || msg.includes("pizza")) {
      const items = await Menu.find().limit(5);

      reply =
        "🍕 Our popular items are:\n" +
        items.map((i) => `• ${i.name} - ₹${i.price}`).join("\n");
    }

    else if (msg.includes("my order") || msg.includes("track")) {
      const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });

      if (!order) {
        reply = "❌ No recent order found.";
      } else {
        reply = `📦 Your latest order is: ${order.status}\n💰 Amount: ₹${order.totalAmount}`;
      }
    }

    else if (msg.includes("cancel")) {
      const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });

      if (!order) {
        reply = "❌ No order found to cancel.";
      } else if (order.status !== "Pending") {
        reply = "⚠️ You can only cancel pending orders.";
      } else {
        order.status = "Cancelled";
        await order.save();
        reply = "✅ Your order has been cancelled.";
      }
    }

    else if (msg.includes("recommend")) {
      reply = "🔥 Try our Cheese Burst Margherita 🍕 or Spicy Chicken Pizza 🌶️";
    }

    else if (msg.includes("delivery")) {
      reply = "🚚 Delivery usually takes 30–45 minutes.";
    }

    else if (msg.includes("payment") || msg.includes("bill")) {
      reply = "💳 We accept UPI, Cash on Delivery, and Online Payments.";
    }

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI error occurred" });
  }
};

module.exports = pizzeriaAI;
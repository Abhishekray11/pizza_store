const express = require("express");
const router = express.Router();

const auth =
require("../middleware/auth");

const NotificationController =
require("../controllers/NotificationController");

router.get(
    "/my",
    auth(["customer"]),
    NotificationController.getMyNotifications
);

router.put(
    "/:id/read",
    auth(["customer"]),
    NotificationController.markRead
);

module.exports = router;
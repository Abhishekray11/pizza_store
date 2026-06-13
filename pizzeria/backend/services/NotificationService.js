const Notification =
require("../models/Notification");

class NotificationService {

    async createNotification(
        userId,
        orderId,
        message
    ) {
        return await Notification.create({
            userId,
            orderId,
            message,
        });
    }

    async getUserNotifications(
        userId
    ) {
        return await Notification.find({
            userId,
        }).sort({
            createdAt: -1,
        });
    }

    async markAsRead(id) {
        return await Notification.findByIdAndUpdate(
            id,
            {
                isRead: true,
            },
            {
                new: true,
            }
        );
    }
}

module.exports =
new NotificationService();
const NotificationService =
require("../services/NotificationService");

class NotificationController {

    async getMyNotifications(
        req,
        res
    ) {
        const notifications =
            await NotificationService.getUserNotifications(
                req.user.id
            );

        res.json(notifications);
    }

    async markRead(
        req,
        res
    ) {
        const notification =
            await NotificationService.markAsRead(
                req.params.id
            );

        res.json(notification);
    }
}

module.exports =
new NotificationController();
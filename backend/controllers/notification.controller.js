const notificationService = require("../services/notification.service");

async function getNotificationByUser(req, res, next) {
    try {
    const { id_user } = req.user;
    const notifications = await notificationService.getNotificationsByUser(id_user);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
}

module.exports = { 
    getNotificationByUser
};

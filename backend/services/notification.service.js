const notificationRepository = require("../repositories/notification.repository");


async function getNotificationsByUser(id_user) {
    console.log(id_user)
    const notifications = await notificationRepository.getNotificationByIdUser(id_user);
    return notifications;
}

async function createNotification(notificationData) {
    notificationRepository.createNotification(notificationData);
}

module.exports = {
    getNotificationsByUser,
    createNotification
}
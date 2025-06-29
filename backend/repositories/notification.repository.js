const Notification = require("../models/notification.model");


async function getNotificationByIdUser(fk_id_user) {
       return await Notification.findAll({
        where: {fk_id_user }
    });
}

async function createNotification(data) {
    return await Notification.create(data);
}

async function deleteNotification(fk_id_table) {
    return await Notification.destroy({where: {fk_id_table}});
}

module.exports = {
    getNotificationByIdUser,
    createNotification,
    deleteNotification
}
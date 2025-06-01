const PendingPasswordChange = require("../models/pendingPasswordChanges.model");

async function create(data){
    return await PendingPasswordChange.create(data);
}

async function findById(id_pending_password_change) {
    return await PendingPasswordChange.findOne({where: {id_pending_password_change}});
}

async function updateById(data, id_pending_password_change) {
    await PendingPasswordChange.update(data, {
        where: {id_pending_password_change}
    });
    return await findById(id_pending_password_change);
}

module.exports = { 
    create,
    findById,
    updateById
}
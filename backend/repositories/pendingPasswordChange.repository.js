const PendingPasswordChange = require("../models/pendingPasswordChanges.model");

async function create(data){
    return await PendingPasswordChange.create(data);
}

module.exports = { create }
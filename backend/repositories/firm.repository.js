const Firm = require("../models/firm.model");

async function create(firmData) {
    return await Firm.create(firmData);
}

async function findNameById(fk_id_user, name){
    return await Firm.findOne({where: {fk_id_user} && {name}})
}

module.exports = {
    create,
    findNameById
}

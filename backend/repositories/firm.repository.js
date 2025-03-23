const Firm = require("../models/firm.model");

async function create(firmData) {
    return await Firm.create(firmData);
}

async function findNameById(fk_id_user, name){
    return await Firm.findOne({where: {fk_id_user} && {name}});
}

async function findByIdUser(fk_id_user){
    return await Firm.findAll({where: {fk_id_user}, attributes: ['id_firm', 'name', 'address'] });
}

module.exports = {
    create,
    findNameById,
    findByIdUser
}

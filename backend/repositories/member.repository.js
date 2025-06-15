const Member = require("../models/member.model");

async function create(data){
    return await Member.create(data);
}

async function findMemberByIdUser(fk_id_user) {
    return await Member.findAll({
        where: { fk_id_user }
    });
}

async function findByIdUserAndIdFirm(fk_id_user, fk_id_firm) {
    return await Member.findOne({
        where: {fk_id_user, fk_id_firm }
    });
}

async function findMemberByFirm(fk_id_firm) {
    return await Member.findAll({
        where: { fk_id_firm }
    });
}

module.exports = {
    create,
    findMemberByIdUser,
    findByIdUserAndIdFirm,
    findMemberByFirm,
}
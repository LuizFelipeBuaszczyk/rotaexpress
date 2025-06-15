const Member = require("../models/member.model");
const User = require("../models/user.model");
const Firm = require("../models/firm.model");

async function create(data){
    return await Member.create(data);
}

async function findMemberByIdUser(fk_id_user) {
    return await Member.findAll({
        include: {
            model: Firm,
            required: true, 
            attributes: ['name', 'address']
        },
        where: { 
            fk_id_user,
            active: true
        },
        attributes: [ 'id_member', 'role']
    });
}

async function findByIdUserAndIdFirm(fk_id_user, fk_id_firm) {
    return await Member.findOne({
        where: { fk_id_user, fk_id_firm }
    });
}

async function findMemberByFirm(fk_id_firm) {
    return await Member.findAll({
        include: {
            model: User,
            required: true,
            attributes: ['name', 'email', 'phone_number']
        },
        where: { 
            fk_id_firm,
            active: true
        },
        attributes: ['id_member', 'role']
    });
}

module.exports = {
    create,
    findMemberByIdUser,
    findByIdUserAndIdFirm,
    findMemberByFirm,
}
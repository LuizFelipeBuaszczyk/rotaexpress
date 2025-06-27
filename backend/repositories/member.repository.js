const Member = require("../models/member.model");
const User = require("../models/user.model");
const Firm = require("../models/firm.model");
const { findById } = require("./firm.repository");

async function create(data){
    return await Member.create(data);
}

async function findMemberByIdMember(id_member) {
    return await Member.findOne({
        where: { id_member }
    });
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
        },
        attributes: ['id_member', 'role', 'active']
    });
}

async function deleteMemberById(id_member){
    return await Member.destroy({where: {id_member}});
}

async function updateMember(id_member, updatadedData) {
    await Member.update(updatadedData, { where: {id_member} });
    return await findMemberByIdMember(id_member);
}

module.exports = {
    create,
    findMemberByIdUser,
    findByIdUserAndIdFirm,
    findMemberByFirm,
    deleteMemberById,
    findMemberByIdMember,
    updateMember
}
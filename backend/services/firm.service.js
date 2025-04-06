const firmRepository = require("../repositories/firm.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


async function createFirm(firmData, userData) {
    const existsFirmWithName = await firmRepository.findNameById(userData.id_user, firmData.name);
    
    //Validações
    if (existsFirmWithName){
        const error = new Error("Nome já existente!");
        error.statusCode = 400;
        throw error;
    }

    firmData.fk_id_user = userData.id_user;
    return await firmRepository.create(firmData);
}

async function getFirmByIDUser(id_user) {
    
    //Regras de negocio


    
    return await firmRepository.findByIdUser(id_user);
}

module.exports = { 
    createFirm,
    getFirmByIDUser
 }
const firmRepository = require("../repositories/firm.repository");


async function createFirm(firmData) {
    
    const existsFirmWithName = await firmRepository.findNameById(firmData.fk_id_user, firmData.name);
    
    //Validações
    if (existsFirmWithName){
        const error = new Error("Nome já existente!");
        error.statusCode = 400;
        throw error;
    }

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
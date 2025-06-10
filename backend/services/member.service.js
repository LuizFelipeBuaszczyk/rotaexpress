const Member = require("../models/member.model");
const memberRepository = require("../repositories/member.repository");
const firmRepository = require("../repositories/firm.repository");
const userRepository = require("../repositories/user.repository");

async function addMember(id_user, id_firm, data){
    // Membro que esta adicionando tem permissão -- ROLE
    
    const firm = await firmRepository.findById(id_firm);

    if (!firm){
        const error = new Error("Não foi encontrado uma organização pelo id.");
        error.statusCode = 404;
        throw error;
    }

    // Verifica se não é o dono da firma -> Se sim, verificar se tem permissão para adicionar novos membros
    if (firm.fk_id_user != id_user){
        const member = await memberRepository.findByIdUserAndIdFirm(id_user, id_firm);

        /*  ROLES NÃO PERMITIDAS
            0 = Apenas visualizador
        */
        if (member.role == 0){
            const error = new Error("Sem permissão para adicionar membro.");
            error.statusCode = 401;
            throw error;
        }
        
    }

    const userByEmail = await userRepository.findByEmail(data.email);

    if (!userByEmail){
        const error = new Error("Não existe nenhum usuário cadastrado com este email.");
        error.statusCode = 404;
        throw error;
    }
    
    const user = userByEmail.dataValues;

    const is_already_member = await memberRepository.findByIdUserAndIdFirm(user.id_user, id_firm);

    if (is_already_member){
        const error = new Error("Esta pessoa já esta na organização.");
        error.statusCode = 400;
        throw error;
    } 

    const newMember = {
        fk_id_user: user.id_user,
        fk_id_firm: id_firm,
        role: data.role
    }

    return await memberRepository.create(newMember);
}

module.exports = {
    addMember
}   
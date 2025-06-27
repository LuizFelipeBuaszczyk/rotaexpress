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

    if (!userByEmail){""
        const error = new Error("Não existe nenhum usuário cadastrado com este email.");
        error.statusCode = 404;
        throw error;
    }
    
    const user = userByEmail.dataValues;

    let is_already_member = await memberRepository.findByIdUserAndIdFirm(user.id_user, id_firm);

    is_already_member = (is_already_member || (user.id_user == firm.fk_id_user))

    if (is_already_member){
        const error = new Error("Pessoa já pertence à organização.");
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

// Retorna os membros de uma firma
async function getMemberByFirm(id_user, id_firm){

    let firms = await firmRepository.findById(id_firm); 

    // Se a firma não existe retorna 1 objeto vazio
    if(!firms){
        return [];
    }

    firms = firms.dataValues;

    // Verificando se pode visualizar os membros
    if ((firms.fk_id_user != id_user)) {
        const error = new Error("Sem permissão para visualizar os membros dessa organização.");
        error.statusCode = 401;
        throw error;
    }

    // Retornar um objeto mais legal
    return await memberRepository.findMemberByFirm(id_firm);
}

// Retorna as firmas que o usuário é membro
async function getMemberByUser(id_user){
    // Retornar o nome das organizações que o usuário e membro e sua rule nela
    return await memberRepository.findMemberByIdUser(id_user);
}

async function removeMemberByFirm(data){
    // Validar se o id_user tem permissão para remover o membro
    firm = await firmRepository.findById(data.id_firm);
    member = await memberRepository.findByIdUserAndIdFirm(data.id_user, data.id_firm);

    if (member){
        if ((member.dataValues.role == 0)){
            const error = new Error("Sem permissão para remover os membros dessa organização.");
            error.statusCode = 401;
            throw error; 
        }
    }

    if (firm){
        return await memberRepository.deleteMemberById(data.id_member);
    }
    else{
        const error = new Error("Sem permissão para remover os membros dessa organização.");
        error.statusCode = 401;
        throw error;
    }
}

async function confirmFirmMemberInvite(id_member, inviteAnswer) {

    let member = await memberRepository.findMemberByIdMember(id_member);

    if(!member){
        const error = new Error("ID de membro não encontrado.");
        error.statusCode = 400;
        throw error;        
    }

    member = member.dataValues;

    if(member.active){
        const error = new Error("O convite para a organização já foi aceito.");
        error.statusCode = 400;
        throw error;  
    }

    if(!inviteAnswer){
        // Deletar o membro
        const deletedMember = await memberRepository.deleteMemberById(id_member);
        console.log(deletedMember);
        return ({message: "Convite recusado!", accept: false});
    }
    
    member.active = true;
    const updatedMember = await memberRepository.updateMember(id_member, member);
    
    if (!updatedMember){
        const error = new Error("Ocorreu um erro interno ao atualizar o membro.");
        error.statusCode = 400;
        throw error;     
    }

    return ({message: "Convite aceito!", accept: true});    
}

module.exports = {
    addMember,
    getMemberByFirm,
    getMemberByUser,
    removeMemberByFirm,
    confirmFirmMemberInvite
}   
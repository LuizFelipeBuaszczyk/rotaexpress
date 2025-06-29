const Member = require("../models/member.model");
const memberRepository = require("../repositories/member.repository");
const firmRepository = require("../repositories/firm.repository");
const userRepository = require("../repositories/user.repository");
const email = require("../modules/gmail/sendEmail");
const oAuth2 = require("../modules/auth/oAuth2");

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

    const createdMember = await memberRepository.create(newMember);
    
    if(!createdMember){
        const error = new Error("Ocorreu um erro interno ao enviar convite para organização.");
        error.statusCode = 500;
        throw error;   
    }

    const memberInvited = await memberRepository.findMemberByIdMember(createdMember.dataValues.id_member);

    sendFirmInviteEmail(memberInvited.dataValues, firm);

    return memberInvited.dataValues;   
}

async function sendFirmInviteEmail(member, firm){
    const user = member.user.dataValues;
    let gmail_token;

    const subject = 'Convite para organização';
    
        const body =    `<h1>Olá, ${user.name}!</h1>
                        <p>Você recebeu um convite para entrar na organização <strong>${firm.name}</strong>.</p>
                        <p>Deseja aceitar o convite? Por favor acesse o nosso <a href=${process.env.URL}>site</a> :</p>
                        <p>Se você não utiliza o sistema RotaExpress, por favor, ignore este e-mail.<br><br>
                        Atenciosamente,<br> Equipe RotaExpress.</p>`;
               
        // Enviar mensagem por e-mail Pedindo para o usuário clicar em um link, com o uuid_senha ou algo do tipo
        try {
            await email.sendEmail(gmail_token, process.env.GMAIL_ADDRESS, user.email, subject, body);
    
        } catch (error) {
            // Caso não tiver sucesso, pega novo token e tenta novamente
            try {
                gmail_token = await oAuth2.getNewToken(
                                process.env.GMAIL_REFRESH_TOKEN,
                                process.env.GMAIL_CLIENT_ID, 
                                process.env.GMAIL_CLIENT_SECRET,
                                process.env.GMAIL_REDIRECT_URL
                            );
                await email.sendEmail(gmail_token, process.env.GMAIL_ADDRESS, user.email, subject, body);
            } catch (error) {
                console.log(error);
            }   
        }        
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
        if (deletedMember){
            return ({message: "Convite recusado!", accept: false});
        }else {
            const error = new Error("Ocorreu um erro interno ao recusar o convite.");
            error.statusCode = 400;
            throw error;
        }
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

async function updateMember(id_firm, memberData){
    const existsMember = await memberRepository.findMemberByIdMember(memberData.id_member);

    if (!existsMember){
        const error = new Error("Membro não encontrado!");
        error.statusCode = 404;
        throw error;    
    }

    const data = {
        id_member: memberData.id_member,
        role: memberData.role
    }

    return await memberRepository.updateMember(memberData.id_member, data);
}

module.exports = {
    addMember,
    getMemberByFirm,
    getMemberByUser,
    removeMemberByFirm,
    confirmFirmMemberInvite,
    updateMember
}   
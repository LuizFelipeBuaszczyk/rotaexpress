const pendingPassowrdChangeRepository = require("../repositories/pendingPasswordChange.repository");
const email = require("../modules/gmail/sendEmail");
const oAuth2 = require("../modules/auth/oAuth2");
const userRepository = require("../repositories/user.repository");
let gmail_token;

async function createPendingPassword(pendingPasswordData, user){

    const pendingPassword = await pendingPassowrdChangeRepository.create(pendingPasswordData);

    const subject = 'Redefinição de Senha: Confirme para continuar';

    const body =    `<h1>Olá, ${user.name}!</h1>
                    <p>Recebemos uma solicitação para alterar a sua senha.</p>
                    <p>Para confirmar essa alteração, clique no link abaixo:</p>
                    <a href="${process.env.URL}/confirm-password-change?id=${pendingPassword.id_pending_password_change}">Confirme alteração</a>
                    <p>Se você não solicitou essa alteração, ignore este e-mail.<br>O link expira em 1 hora por motivos de segurança.<br><br>
                    Atenciosamente,<br> Equipe RotaExpress.</p>`;
           
    // Enviar mensagem por e-mail Pedindo para o usuário clicar em um link, com o uuid_senha ou algo do tipo
    try {
        let res = await email.sendEmail(gmail_token, process.env.GMAIL_ADDRESS, user.email, subject, body);

    } catch (error) {
        // Caso não tiver sucesso, pega novo token e tenta novamente
        try {
            gmail_token = await oAuth2.getNewToken(
                            process.env.GMAIL_REFRESH_TOKEN,
                            process.env.GMAIL_CLIENT_ID, 
                            process.env.GMAIL_CLIENT_SECRET,
                            process.env.GMAIL_REDIRECT_URL
                        );
            res = await email.sendEmail(gmail_token, process.env.GMAIL_ADDRESS, user.email, subject, body);
        } catch (error) {
            const err = new Error("Ocorreu um erro interno ao enviar o email. Por favor, tente mais tarde!");
            err.statusCode = 500;
            throw err;
        }   
    }

    return res;

}

async function confirmPendingPassword(id_pendingPassword){

    // Verificar se existe uma senha com pendencia baseado no ID
    const passwordData = await pendingPassowrdChangeRepository.findById(id_pendingPassword);

    if (!passwordData){
        const error = new Error(`Não foi encontrado nenhuma senha com o seguinte código: ${id_pendingPassword}`);
        error.statusCode = 404;
        throw error;
    }

    if (passwordData.dataValues.confirmed){
        const error = new Error(`Já foi confirmado a mudança da senha anteriormente.`);
        error.statusCode = 400;
        throw error; 
    }

    // Verificar se o tempo de expiração não foi expirado
    const now = Date.now();
    const expireAt = passwordData.dataValues.expires_at.getTime();
    if ((expireAt - now) < 0){
        const error = new Error(`O tempo para alteração de senha foi expirado.`);
        error.statusCode = 400;
        throw error;
    }
    
    // Alterar status da pending password
    let updatedData = {
        password: passwordData.dataValues.password,
        confirmed: true,
        created_at: passwordData.dataValues.created_at,
        expires_at: passwordData.dataValues.expires_at,
        fk_id_user: passwordData.dataValues.fk_id_user
    };

    updatedData = await pendingPassowrdChangeRepository.updateById(updatedData, id_pendingPassword);

    // Alterar a senha do usuário
    const userData = await userRepository.findByUserId(passwordData.dataValues.fk_id_user);

    userData.dataValues.password = updatedData.dataValues.password;

    const updateUser = await userRepository.updateById(userData.dataValues.id_user, userData.dataValues);

    if (updateUser.dataValues.password === userData.dataValues.password){
        return true;
    }
    else{
        return false;
    }

}

module.exports = { 
    createPendingPassword,
    confirmPendingPassword
 }
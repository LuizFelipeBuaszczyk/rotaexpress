const pendingPassowrdChangeRepository = require("../repositories/pendingPasswordChange.repository");
const email = require("../modules/gmail/sendEmail");
const oAuth2 = require("../modules/auth/oAuth2");
let gmail_token;

async function createPendingPassword(pendingPasswordData, user){

    const pendingPassword = await pendingPassowrdChangeRepository.create(pendingPasswordData);

    const subject = 'Confirmação da alteração de senha';

    const body =  `Olá, ${user.name}!\nRecebemos uma solicitação para alterar a sua senha.\n`+
                    `Para confirmar essa alteração, clique no link abaixo:\n\n` +
                    `${process.env.URL}/confirm-password-change?id=${pendingPassword.id_pending_password_change} \n\n` +
                    `Se você não solicitou essa alteração, ignore este e-mail.\nO link expira em 1 hora por motivos de segurança.\n\n` +
                    `Atenciosamente,\n Equipe RotaExpress.`;
           

    // Enviar mensagem por e-mail Pedindo para o usuário clicar em um link, com o uuid_senha ou algo do tipo
    let res = email.sendEmail(gmail_token, process.env.GMAIL_ADDRESS, user.email, subject, body);

    // Caso não tiver sucesso, pega novo token e tenta novamente
    if (!res.success){
         try {
            gmail_token = await oAuth2.getNewToken(
                            process.env.GMAIL_REFRESH_TOKEN,
                            process.env.GMAIL_CLIENT_ID, 
                            process.env.GMAIL_CLIENT_SECRET,
                            process.env.GMAIL_REDIRECT_URL
                        );
            res = email.sendEmail(gmail_token, process.env.GMAIL_ADDRESS, user.email, subject, body);
        } catch (error) {
            const err = new Error("Ocorreu um erro interno ao enviar o email. Por favor, tente mais tarde!");
            err.statusCode = 400;
            throw err;
        }  
    }

    return res;

}

module.exports = { createPendingPassword }
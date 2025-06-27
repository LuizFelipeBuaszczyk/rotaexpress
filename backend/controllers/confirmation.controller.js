const pendingPasswordService = require("../services/pendingPasswordChange.service");
const memberService = require("../services/member.service"); 

async function confirmChangePassword(req, res, next) {
    try {
        if(!req.query.id){
            const error = new Error("code pending password is necessary");
            error.statusCode = 400;
            throw error;
        }
        const id_pendingPasswordChange = req.query.id;
        
        const suc = await pendingPasswordService.confirmPendingPassword(id_pendingPasswordChange);

        let msg;

        if (suc){
            msg = "Senha alterada com sucesso";
        }
        else{
            msg = "Ocorreu um erro ao confirmar a mudança de senha, por favor entre em contato com nosso suporte."
        }
        return res.status(200).json({success: suc, message: msg});
    } catch (error) {
        next(error);
    }
}

async function confirmFirmMemberInvite(req, res, next) {
    try{
        if(!req.query.id){
            const error = new Error("member invite code is necessary");
            error.statusCode = 400;
            throw error;    
        }
        const id_member = req.query.id;
        const inviteAnswer = req.body.answer;

        const response = await memberService.confirmFirmMemberInvite(id_member, inviteAnswer);
        return res.status(200).json(response);
    }catch(error){
        next(error);
    }
}

module.exports = {
    confirmChangePassword,
    confirmFirmMemberInvite
}
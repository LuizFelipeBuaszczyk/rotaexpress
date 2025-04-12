const firmService = require("../services/firm.service")

async function createFirm(req, res) {
    //Chamar firm service
    try{
        const userData = req.user;
        const firm = await firmService.createFirm(req.body, userData);
        return res.status(201).json(firm);
    }catch (error){
        return res.status(500).json({error: error.message})
    }    
}

async function getFirmByIDUser(req, res){
    try{
        const firms = await firmService.getFirmByIDUser(req.user.id_user);
        return res.json(firms);
    }catch (error){
        return res.status(500).json({error: error.message});
    }
}


module.exports = { 
    createFirm,
    getFirmByIDUser 
} 
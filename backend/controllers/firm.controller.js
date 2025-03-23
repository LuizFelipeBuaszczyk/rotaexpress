const firmService = require("../services/firm.service")

async function createFirm(req, res) {
    //Chamar firm service
    try{
        const firm = await firmService.createFirm(req.body);
        return res.status(201).json(firm);
    }catch (error){
        return res.status(500).json({error: error.message})
    }    
}


module.exports = { createFirm } 
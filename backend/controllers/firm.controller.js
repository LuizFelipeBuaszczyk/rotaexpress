const firmService = require("../services/firm.service");

async function createFirm(req, res, next) {
  //Chamar firm service
  try {
    const userData = req.user;
    const firm = await firmService.createFirm(req.body, userData);
    return res.status(201).json(firm);
  } catch (error) {
    next(error);
  }
}

async function getFirmByIDUser(req, res, next) {
  try {
    const firms = await firmService.getFirmByIDUser(req.user.id_user);
    return res.json(firms);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createFirm,
  getFirmByIDUser,
};

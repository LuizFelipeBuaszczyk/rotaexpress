const firmService = require("../services/firm.service");
const memberService = require("../services/member.service");
const ParamsSchema = require("../validators/uuidparam.validator");

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

async function getFirmByName(req, res, next) {
  try {
    const { id_user } = req.user;
    const { name } = req.params;
    const firms = await firmService.getFirmByName(id_user, name);
    return res.json(firms);
  } catch (error) {
    next(error);
  }
}

async function updateFirm(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);
    const firm = await firmService.updateFirm(req.body, id, id_user);
    return res.json(firm);
  } catch (error) {
    next(error);
  }
}

async function deleteFirm(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);
    const firm = await firmService.deleteFirm(id, id_user);
    return res.json(firm);
  } catch (error) {
    next(error);
  }
}

// Membros da organização
async function addMember(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);
    const member = await memberService.addMember(id_user, id, req.body);
    return res.json(member);
  } catch (error) {
    next(error);
  }
}

async function getMemberByFirm(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);
    const members = await memberService.getMemberByFirm(id_user, id);
    return res.json(members);
  } catch (error) {
    next(error);
  }
}

async function getFirmByRouteId(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);
    const firm = await firmService.getFirmByRouteId(id_user, id);
    return res.json(firm);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createFirm,
  getFirmByIDUser,
  updateFirm,
  deleteFirm,
  addMember,
  getFirmByName,
  getMemberByFirm,
  getFirmByRouteId,
};

const firmRepository = require("../repositories/firm.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createFirm(firmData, userData) {
  const existsFirmWithName = await firmRepository.findNameById(
    userData.id_user,
    firmData.name
  );

  //Validações
  if (existsFirmWithName) {
    const error = new Error("Nome já existente!");
    error.statusCode = 400;
    throw error;
  }

  firmData.fk_id_user = userData.id_user;
  return await firmRepository.create(firmData);
}

async function getFirmByIDUser(id_user) {
  return await firmRepository.findByIdUser(id_user);
}

async function updateFirm(firmData, id_firm, id_user) {
  const existsFirm = await firmRepository.findById(id_firm, id_user);
  if (!existsFirm) {
    const error = new Error("Firma não encontrada!");
    error.statusCode = 400;
    throw error;
  }

  let existsFirmWithName = null;
  if (firmData.name) {
    existsFirmWithName = await firmRepository.findNameById(
      id_user,
      firmData.name
    );
  }

  if (existsFirmWithName && existsFirmWithName.id_firm !== id_firm) {
    const error = new Error("Nome já existente!");
    error.statusCode = 400;
    throw error;
  }

  return await firmRepository.updateById(firmData, id_firm, id_user);
}

async function deleteFirm(id_firm, id_user) {
  const existsFirm = await firmRepository.findByIdAndIdUser(id_firm, id_user);

  if (!existsFirm) {
    const error = new Error("Firma não encontrada!");
    error.statusCode = 400;
    throw error;
  }

  return await firmRepository.deleteById(id_firm);
}

module.exports = {
  createFirm,
  getFirmByIDUser,
  updateFirm,
  deleteFirm,
};

const User = require("../models/user.model");

async function findAll() {
  return await User.findAll();
}

async function create(userData) {
  return await User.create(userData);
}

async function findByEmail(email) {
  return await User.findOne({ where: { email } });
}

async function findByCPF(cpf) {
  return await User.findOne({ where: { cpf } });
}

module.exports = {
  findAll,
  create,
  findByEmail,
  findByCPF,
};

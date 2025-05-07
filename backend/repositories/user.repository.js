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

async function findByUserId(id_user) {
  return await User.findOne({ where: { id_user } });
}

async function updateById(id_user, updatedData) {

  const user = await findByUserId(id_user);
  if (!user) return null;
  await User.update(updatedData, { where: { id_user } });
  return await findByUserId(id_user);
}

async function deleteById(id_user) {
  return await User.destroy({ where: { id_user } });
}

module.exports = {
  findAll,
  create,
  findByEmail,
  findByCPF,
  findByUserId,
  updateById,
  deleteById,
};

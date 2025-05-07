const userRepository = require("../repositories/user.repository");
const isValidCPF = require("../utils/cpf.validator");

async function getUserById(id_user) {
  return await userRepository.findByUserId(id_user);
}

async function updateUser(updateData, id_user) {
  let userExistsEmail = false;
  if (updateData.email) {
    userExistsEmail = await userRepository.findByEmail(updateData.email);
  }

  if (updateData.email && userExistsEmail ) {
    try {
      if (!(id_user == userExistsEmail.id_user)){
        throw error;
      }
    } catch (error) {
      error = new Error("Email já cadastrado");
      error.statusCode = 400;
      throw error;
    }
  }

  let userExistsCPF = false;
  if (updateData.cpf) {
    userExistsCPF = await userRepository.findByCPF(updateData.cpf);
  }

  if (updateData.cpf && userExistsCPF) {

    try {
      if (!(id_user == userExistsCPF.id_user)){
        throw error;
      }

    } catch (error) {
      error = new Error("CPF já cadastrado");
      error.statusCode = 400;
      throw error;
    }
    
  }
  if (updateData.cpf && !isValidCPF(updateData.cpf)) {
    const error = new Error("CPF inválido");
    error.statusCode = 400;
    throw error;
  }
  const user = await userRepository.updateById(id_user, updateData);
  if (user) return user;
  const error = new Error("Usuário não encontrado");
  error.statusCode = 404;
  throw error;
}

async function deleteUser(id_user) {
  const user = await userRepository.findByUserId(id_user);
  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }
  return await userRepository.deleteById(id_user);
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};

const userRepository = require("../repositories/user.repository");
const isValidCPF = require("../utils/cpf.validator");

async function createUser(userData) {
  const userExistsEmail = await userRepository.findByEmail(userData.email);
  if (userExistsEmail) {
    const error = new Error("Email já cadastrado");
    error.statusCode = 400;
    throw error;
  }
  if (userData.cpf){
    const userExistsCPF = await userRepository.findByCPF(userData.cpf);
  }
  if (userData.cpf && userExistsCPF) {
    const error = new Error("CPF já cadastrado");
    error.statusCode = 400;
    throw error;
  }
  if (userData.cpf && !isValidCPF(userData.cpf)) {
    const error = new Error("CPF inválido");
    error.statusCode = 400;
    throw error;
  }

  return await userRepository.create(userData);
}

module.exports = { createUser };

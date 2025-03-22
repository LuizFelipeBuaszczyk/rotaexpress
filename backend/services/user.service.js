const userRepository = require("../repositories/user.repository");

async function getAllUsers() {
  return await userRepository.findAll();
}

async function createUser(userData) {
  const userExistsEmail = await userRepository.findByEmail(userData.email);
  if (userExistsEmail) {
    const error = new Error("Email já cadastrado");
    error.statusCode = 400;
    throw error;
  }

  const userExistsCPF = null;
  if (userData.cpf) {
    userExistsCPF = await userRepository.findByCPF(userData.cpf);
  }

  if (userExistsCPF) {
    const error = new Error("CPF já cadastrado");
    error.statusCode = 400;
    throw error;
  }

  return await userRepository.create(userData);
}

module.exports = {
  getAllUsers,
  createUser,
};

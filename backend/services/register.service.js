const userRepository = require("../repositories/user.repository");

async function createUser(userData) {
  const userExistsEmail = await userRepository.findByEmail(userData.email);
  if (userExistsEmail) {
    const error = new Error("Email já cadastrado");
    error.statusCode = 400;
    throw error;
  }

  return await userRepository.create(userData);
}

module.exports = { createUser };

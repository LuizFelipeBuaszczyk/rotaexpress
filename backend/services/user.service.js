const userRepository = require("../repositories/user.repository");

async function getAllUsers() {
  return await userRepository.findAll();
}

module.exports = {
  getAllUsers,
};

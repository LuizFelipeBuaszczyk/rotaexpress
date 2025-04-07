const userRepository = require("../repositories/user.repository");

async function getUserById(id_user) {
  return await userRepository.findByUserId(id_user);
}

module.exports = {
  getUserById,
};

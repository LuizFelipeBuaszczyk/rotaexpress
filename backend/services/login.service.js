const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(userData) {
  const user = await userRepository.findByEmail(userData.email);

  if (!user || !(await bcrypt.compare(userData.password, user.password))) {
    const error = new Error("Credenciais inválidas");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    { id_user: user.id_user },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );

  return { token, refreshToken, user };
}

module.exports = { login };

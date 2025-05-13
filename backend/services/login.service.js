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

  return { token, refreshToken };
}

async function checkCredentials(token){

    if (token.authToken){
      return true;
    }
    else{
      if(token.refreshToken){
        const refresh = require('./refreshToken.service.js');
        const data = refresh.refreshToken(token.refreshToken);

        res.cookie("authToken", data.accessToken, {
          httpOnly: true,
          secure: false, 
          sameSite: "Strict",
          path: "/",
          maxAge: 3600000 // 1000 * 60 * 60 -> 3.600.000ms || 1000ms * 60s * Xmin || 1 hora
        });
        
        return true;
      }
      else {
        return false;
      }
    }

}

module.exports = { login, checkCredentials };

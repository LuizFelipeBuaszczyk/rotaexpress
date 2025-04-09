const jwt = require("jsonwebtoken");
require("dotenv").config();

function refreshToken(oldRefreshToken) {
  try {
    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id_user: decoded.id_user },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { accessToken: newAccessToken };
  } catch (error) {
    const err = new Error("Refresh token inválido");
    err.statusCode = 401;
    throw err;
  }
}

module.exports = { refreshToken };

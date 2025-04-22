const refreshService = require("../services/refreshToken.service");

async function refresh(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    const data = refreshService.refreshToken(refreshToken);

    res.cookie("authToken", data.accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "Strict",
      path: "/",
      maxAge: 3600000 // 1000 * 60 * 60 -> 3.600.000ms || 1000ms * 60s * Xmin || 1 hora
    });

    res.status(200).json({succes: true});
  } catch (error) {
    next(error);
  }
}

module.exports = { refresh };

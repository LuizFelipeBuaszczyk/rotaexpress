const loginService = require("../services/login.service");

async function login(req, res, next) {
  try {
    const loginData = await loginService.login(req.body);

    res.cookie("authToken", loginData.token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Strict",
      path: "/",
      maxAge: 3600000 // 1000 * 60 * 60 -> 3.600.000ms || 1000ms * 60s * Xmin || 1 hora
    });
  
    res.cookie("refreshToken", loginData.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/",
      maxAge: 86400000 // 1000 * 60 * 60 * 24  -> 86.400.000ms || 1000ms * 60s * 60min * Xh || 24h
    });
    res.status(200).json({succes: true});
  } catch (error) {
    next(error);
  }
}

async function checkCredentials(req, res){

  //req.user.id_user

  // Retorna que já possui token salvo nos cookies
  res.status(200).json({login: true});
}

module.exports = { login, checkCredentials };

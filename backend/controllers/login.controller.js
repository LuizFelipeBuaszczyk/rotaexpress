const loginService = require("../services/login.service");

async function login(req, res, next) {
  try {
    const user = await loginService.login(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { login };

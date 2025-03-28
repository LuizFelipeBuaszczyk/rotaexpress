const registerService = require("../services/register.service");

async function register(req, res, next) {
  try {
    const user = await registerService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { register };

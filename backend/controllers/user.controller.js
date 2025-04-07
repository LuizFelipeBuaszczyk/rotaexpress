const userService = require("../services/user.service");

async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res) {
  try {
    const users = await userService.getUserById(req.user.id_user);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, getUserById };

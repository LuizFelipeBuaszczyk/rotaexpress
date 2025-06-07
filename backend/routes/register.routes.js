const express = require("express");

const registerController = require("../controllers/register.controller");
const hashPassword = require("../utils/password.hash");
const { validateUser } = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/", validateUser, hashPassword, registerController.register);

module.exports = router;

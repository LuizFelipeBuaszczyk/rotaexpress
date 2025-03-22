const express = require("express");
const userController = require("../controllers/user.controller");
const validateUser = require("../middlewares/user.middleware");
const hashPassword = require("../middlewares/password.hash");

const router = express.Router();

router.post("/", validateUser, hashPassword, userController.createUser);
router.get("/", userController.getAllUsers);

module.exports = router;

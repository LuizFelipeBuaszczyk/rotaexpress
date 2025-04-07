const express = require("express");
const userController = require("../controllers/user.controller");
const hashPassword = require("../utils/password.hash");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, hashPassword, userController.createUser);
router.get("/", authMiddleware, userController.getUserById);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const loginController = require("../controllers/login.controller");

const router = express.Router();

router.post("/", loginController.login);
router.get("/check", authMiddleware, loginController.checkCredentials)

module.exports = router;

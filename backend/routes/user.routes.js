const express = require("express");
const userController = require("../controllers/user.controller");
const hashPassword = require("../utils/password.hash");
const authMiddleware = require("../middlewares/auth.middleware");
const validatePutUser = require("../middlewares/user.put.middleware");
const { validateChangePassword } = require("../middlewares/user.middleware");

const router = express.Router();

router.get("/", authMiddleware, userController.getUserById);

router.put(
  "/",
  hashPassword,
  authMiddleware,
  validatePutUser,
  userController.updateUsers
);

router.post("/password", 
  authMiddleware, 
  validateChangePassword, 
  hashPassword,
  userController.changePassword
);

router.delete("/", authMiddleware, userController.deleteUser);

router.get("/firms/member", authMiddleware, userController.getFirmsWhenUserIsMember);

module.exports = router;

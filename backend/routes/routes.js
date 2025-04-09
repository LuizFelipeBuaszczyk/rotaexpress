const express = require("express");

const userRoutes = require("./user.routes");
const firmRoutes = require("./firm.routes");
const loginRoutes = require("./login.routes");
const registerRoutes = require("./register.routes");
const refreshTokenRoutes = require("./refreshToken.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/firms", firmRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/refresh", refreshTokenRoutes);

module.exports = router;

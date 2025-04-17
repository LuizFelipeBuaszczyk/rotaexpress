const express = require("express");

const userRoutes = require("./user.routes");
const firmRoutes = require("./firm.routes");
const loginRoutes = require("./login.routes");
const registerRoutes = require("./register.routes");
const refreshTokenRoutes = require("./refreshToken.routes");
const routeRoutes = require("./route.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/firms", firmRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/refresh", refreshTokenRoutes);
router.use("/routes", routeRoutes);

module.exports = router;

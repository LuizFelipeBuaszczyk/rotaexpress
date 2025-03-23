const express = require("express");

const userRoutes = require("./user.routes");
const firmRoutes = require("./firm.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/firms", firmRoutes)

module.exports = router;

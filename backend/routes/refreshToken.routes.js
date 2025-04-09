const express = require("express");
const refreshController = require("../controllers/refreshToken.controller");

const router = express.Router();

router.post("/", refreshController.refresh);

module.exports = router;

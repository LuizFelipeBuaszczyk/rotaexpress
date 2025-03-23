const express = require("express");

const firmController = require("../controllers/firm.controller")

const router = express.Router();

router.post("/", firmController.createFirm);

module.exports = router
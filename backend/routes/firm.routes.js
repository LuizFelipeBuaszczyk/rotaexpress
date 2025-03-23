const express = require("express");

const firmController = require("../controllers/firm.controller")

const router = express.Router();

router.post("/", firmController.createFirm);
router.get("/:id_user", firmController.getFirmByIDUser);

module.exports = router
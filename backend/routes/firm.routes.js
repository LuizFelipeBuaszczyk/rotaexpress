const express = require("express");

const firmController = require("../controllers/firm.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validateFirmBody = require("../middlewares/firm.middleware")

const router = express.Router();

router.post("/", authMiddleware, validateFirmBody, firmController.createFirm);
router.get("/:id_user", authMiddleware, firmController.getFirmByIDUser);

module.exports = router;

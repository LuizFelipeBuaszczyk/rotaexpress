const express = require("express");

const firmController = require("../controllers/firm.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateCreateFirm } = require("../middlewares/firm.middleware");
const { validateUpdateFirm } = require("../middlewares/firm.middleware");

const router = express.Router();

router.post("/", authMiddleware, validateCreateFirm, firmController.createFirm);
router.put(
  "/:id",
  authMiddleware,
  validateUpdateFirm,
  firmController.updateFirm
);
router.get("/", authMiddleware, firmController.getFirmByIDUser);
router.delete("/:id", authMiddleware, firmController.deleteFirm);

module.exports = router;

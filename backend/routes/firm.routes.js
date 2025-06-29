const express = require("express");

const firmController = require("../controllers/firm.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateCreateFirm } = require("../middlewares/firm.middleware");
const { validateUpdateFirm } = require("../middlewares/firm.middleware");
const { validateAddMember } = require("../middlewares/firm.middleware");

const router = express.Router();

router.post("/", authMiddleware, validateCreateFirm, firmController.createFirm);
router.put(
  "/:id",
  authMiddleware,
  validateUpdateFirm,
  firmController.updateFirm
);
router.get("/", authMiddleware, firmController.getFirmByIDUser);
router.get("/name/:name", authMiddleware, firmController.getFirmByName);
router.get("/route/:id", authMiddleware, firmController.getFirmByRouteId);
router.delete("/:id", authMiddleware, firmController.deleteFirm);

// Member
router.post("/member/:id", authMiddleware, validateAddMember, firmController.addMember);
router.put("/member/:id", authMiddleware, firmController.updateMember);
router.get("/member/:id", authMiddleware, firmController.getMemberByFirm);
router.delete("/:id_firm/member/:id_member", authMiddleware, firmController.removeMemberByFirm);

module.exports = router;

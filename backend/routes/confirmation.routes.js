const express = require("express");

const confirmationController = require("../controllers/confirmation.controller");

const router = express.Router();

router.patch("/password", confirmationController.confirmChangePassword);
router.patch("/member", confirmationController.confirmFirmMemberInvite);

module.exports = router;

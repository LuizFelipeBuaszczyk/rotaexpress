const express = require("express");

const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, notificationController.getNotificationByUser);

module.exports = router;

const express = require("express");
const routeController = require("../controllers/route.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validateRouteBody = require("../middlewares/route.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateRouteBody,
  routeController.createRoute
);
router.get("/", authMiddleware, routeController.getRoutes);

module.exports = router;

const express = require("express");
const routeController = require("../controllers/route.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validateRouteBody = require("../middlewares/route.middleware");
const validatePutRoute = require("../middlewares/route.put.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateRouteBody,
  routeController.createRoute
);
router.get("/", authMiddleware, routeController.getRoutes);
router.put(
  "/:id",
  authMiddleware,
  validatePutRoute,
  routeController.updateRoutes
);
router.delete("/:id", authMiddleware, routeController.deleteRoutes);
router.post(
  "/generate-route",
  authMiddleware,
  routeController.generateOptimizedRoute
);

module.exports = router;

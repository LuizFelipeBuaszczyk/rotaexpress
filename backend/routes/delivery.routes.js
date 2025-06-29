const express = require("express");
const deliveryController = require("../controllers/delivery.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  validateCreateDelivery,
} = require("../middlewares/delivery.middleware");
const {
  validateUpdateDelivery,
} = require("../middlewares/delivery.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateCreateDelivery,
  deliveryController.createDelivery
);
router.get("/firm/:id", authMiddleware, deliveryController.getDeliveries);
router.get("/:id", authMiddleware, deliveryController.getDeliveriesById);

router.put(
  "/:id",
  authMiddleware,
  validateUpdateDelivery,
  deliveryController.updateDelivery
);
router.delete("/:id", authMiddleware, deliveryController.deleteDelivery);
router.patch("/:id", authMiddleware, deliveryController.updateRoute);

module.exports = router;

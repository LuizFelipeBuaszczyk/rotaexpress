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
router.get("/", authMiddleware, deliveryController.getDeliveries);
router.put(
  "/:id",
  authMiddleware,
  validateUpdateDelivery,
  deliveryController.updateDelivery
);
router.delete("/:id", authMiddleware, deliveryController.deleteDelivery);

module.exports = router;

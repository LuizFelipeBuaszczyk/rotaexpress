const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateCreateProduct } = require("../middlewares/product.middleware");
const { validateUpdateProduct } = require("../middlewares/product.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateCreateProduct,
  productController.createProduct
);
router.get("/", authMiddleware, productController.getProducts);
router.put(
  "/:id",
  authMiddleware,
  validateUpdateProduct,
  productController.updateProduct
);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;

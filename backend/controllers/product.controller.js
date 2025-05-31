const ProductService = require("../services/product.service");
const ParamsSchema = require("../validators/uuidparam.validator");

async function createProduct(req, res, next) {
  try {
    const product = await ProductService.createProduct(
      req.body,
      req.user.id_user
    );
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}
async function getProducts(req, res, next) {
  try {
    const { id_user } = req.user;
    const products = await ProductService.getProducts(id_user);
    if (!products) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);

    const product = await ProductService.updateProduct(req.body, id_user, id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);

    const product = await ProductService.deleteProduct(id, id_user);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

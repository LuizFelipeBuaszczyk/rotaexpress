const ProductRepository = require("../repositories/product.repository");
const DeliveryRepository = require("../repositories/delivery.repository");

async function createProduct(productData, id_user) {
  const delivery = await DeliveryRepository.findById(
    productData.fk_id_delivery,
    id_user
  );
  if (!delivery) {
    const error = new Error("Entrega não encontrada");
    error.statusCode = 404;
    throw error;
  }
  const product = await ProductRepository.create(productData);
  return product;
}

async function getProducts(id_user) {
  const products = await ProductRepository.findAll(id_user);
  return products;
}

async function updateProduct(productData, id_user, id_product) {
  const delivery = await DeliveryRepository.findById(
    productData.fk_id_delivery,
    id_user
  );
  if (!delivery) {
    const error = new Error("Entrega não encontrada");
    error.statusCode = 404;
    throw error;
  }
  const product = await ProductRepository.findById(id_product, id_user);
  if (!product) {
    const error = new Error("Produto não encontrado");
    error.statusCode = 404;
    throw error;
  }
  const productUpdated = await ProductRepository.updateById(
    productData,
    id_user,
    id_product
  );
  return productUpdated;
}

async function deleteProduct(id_product, id_user) {
  const product = await ProductRepository.findById(id_product, id_user);
  if (!product) {
    const error = new Error("Produto não encontrado");
    error.statusCode = 404;
    throw error;
  }
  return await ProductRepository.deleteById(id_product, id_user);
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

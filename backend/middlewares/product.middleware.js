const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validator");

const validateCreateProduct = async (req, res, next) => {
  const validation = await createProductSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

const validateUpdateProduct = async (req, res, next) => {
  const validation = await updateProductSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};

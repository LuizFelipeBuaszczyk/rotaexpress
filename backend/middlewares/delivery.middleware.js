const {
  createDeliverySchema,
  updateDeliverySchema,
} = require("../validators/delivery.validator");

const validateCreateDelivery = async (req, res, next) => {
  const validation = await createDeliverySchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

const validateUpdateDelivery = async (req, res, next) => {
  const validation = await updateDeliverySchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

module.exports = {
  validateCreateDelivery,
  validateUpdateDelivery,
};

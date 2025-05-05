const { updateRouteSchema } = require("../validators/route.validator");

const validatePutRoute = async (req, res, next) => {
  const validation = await updateRouteSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

module.exports = validatePutRoute;

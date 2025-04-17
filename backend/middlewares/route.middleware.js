const createRouteSchema = require("../validators//route.validator");

const validateRoute = async (req, res, next) => {
  const validation = await createRouteSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

module.exports = validateRoute;

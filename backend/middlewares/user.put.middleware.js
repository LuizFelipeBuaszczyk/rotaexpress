const { updateUserSchema } = require("../validators/user.validator");

const validatePutUser = async (req, res, next) => {
  const validation = await updateUserSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

module.exports = validatePutUser;

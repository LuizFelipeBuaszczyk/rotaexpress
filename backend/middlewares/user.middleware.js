const createUserSchema = require("../validators/user.validator");

const validateUser = async (req, res, next) => {
  const validation = await createUserSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

module.exports = validateUser;

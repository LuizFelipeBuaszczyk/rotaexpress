const { createUserSchema, changeUserPasswordSchema } = require("../validators/user.validator");

const validateUser = async (req, res, next) => {
  const validation = await createUserSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

const validateChangePassword = async (req, res, next) => {
  const validation = await changeUserPasswordSchema.safeParseAsync(req.body);

  if(!validation.success){
    return next(validation.error);
  }

  next();
}

module.exports = { 
  validateUser,
  validateChangePassword
 };

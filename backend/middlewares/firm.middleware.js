const {
  createFirmSchema,
  updateFirmSchema,
} = require("../validators/firm.validator");

const { createMemberSchema } = require("../validators/member.validator");

const validateCreateFirm = async (req, res, next) => {
  const validation = await createFirmSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

const validateUpdateFirm = async (req, res, next) => {
  const validation = await updateFirmSchema.safeParseAsync(req.body);

  if (!validation.success) {
    return next(validation.error);
  }

  next();
};

const validateAddMember = async (req, res, next) => {
  const validation = await createMemberSchema.safeParseAsync(req.body);

  if (!validation.success){
    return next(validation.error);
  }

  next();
}

module.exports = {
  validateCreateFirm,
  validateUpdateFirm,
  validateAddMember
};

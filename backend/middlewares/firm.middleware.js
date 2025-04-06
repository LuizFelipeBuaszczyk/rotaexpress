const createFirmSchema = require("../validators/firm.validator");

const validateFirm = async (req, res, next) => {
    const validation = await createFirmSchema.safeParseAsync(req.body);

    if (!validation.success) {
        return next(validation.error);
    }
    
    next();
};

module.exports = (validateFirm)

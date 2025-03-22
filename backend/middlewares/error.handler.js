const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      code: 400,
      error: "Erro de validação!",
      messages: err.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      code: err.statusCode,
      error: err.message,
    });
  }
};

module.exports = errorHandler;

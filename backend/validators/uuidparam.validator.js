const z = require("zod");

const ParamsSchema = z.object({
  id: z.string().uuid({ message: "O id deve ser um UUID válido" }),
});

module.exports = ParamsSchema;

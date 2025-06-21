const z = require("zod");

const ParamsSchema = z.object({
  id: z.string().uuid({ message: "O id deve ser um UUID válido" }).optional(),
  id_member: z.string().uuid({ message: "O id do membro deve ser um UUID válido" }).optional(),
  id_firm: z.string().uuid({ message: "O id da firma deve ser um UUID válido" }).optional(),
});


module.exports = ParamsSchema;

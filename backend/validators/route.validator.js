const z = require("zod");

const createRouteSchema = z.object({
  cpf: z
    .string({ required_error: "O campo CPF é obrigatório" })
    .min(11)
    .max(14)
    .nonempty(),
  firm_name: z
    .string({ required_error: "O campo id_firm é obrigatório" })
    .nonempty(),
});

module.exports = createRouteSchema;

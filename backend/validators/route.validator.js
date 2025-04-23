const z = require("zod");

const createRouteSchema = z.object({
  cpf: z
    .string({ required_error: "O campo CPF é obrigatório" })
    .min(11)
    .max(14)
    .nonempty(),
  firm_name: z
    .string({ required_error: "O campo firm_name é obrigatório" })
    .nonempty(),
  date: z
    .string({ required_error: "O campo date é obrigatório (YYYY-MM-DD)" })
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "O formato da data deve ser YYYY-MM-DD",
    }),
  description: z.string().nullable(),
});

module.exports = createRouteSchema;

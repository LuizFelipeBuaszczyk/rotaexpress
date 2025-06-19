const z = require("zod");

const createRouteSchema = z.object({
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

const updateRouteSchema = z.object({
  firm_name: z.string().optional(),
  date: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "O formato da data deve ser YYYY-MM-DD",
    })
    .optional(),
  description: z.string().nullable().optional(),
});

module.exports = { createRouteSchema, updateRouteSchema };

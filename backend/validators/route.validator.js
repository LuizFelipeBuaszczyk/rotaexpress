const z = require("zod");

const createRouteSchema = z.object({
  firm_name: z
    .string({ required_error: "O campo firm_name é obrigatório" })
    .nonempty(),
  date: z
    .string()
    .transform((val) => (val === "" ? undefined : new Date(val)))
    .refine((val) => val === undefined || !isNaN(val.getTime()), {
      message: "O formato da data deve ser YYYY-MM-DD",
    })
    .optional(),
  description: z.string().nullable().optional(),
});

const updateRouteSchema = z.object({
  firm_name: z.string().optional(),
  date: z
    .string()
    .transform((val) => (val === "" ? undefined : new Date(val)))
    .refine((val) => val === undefined || !isNaN(val.getTime()), {
      message: "O formato da data deve ser YYYY-MM-DD",
    })
    .optional(),
  description: z.string().nullable().optional(),
});

module.exports = { createRouteSchema, updateRouteSchema };

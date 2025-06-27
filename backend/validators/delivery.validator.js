const z = require("zod");

const createDeliverySchema = z.object({
  fk_id_firm: z
    .string({ required_error: "O campo fk_id_firm é obrigatório" })
    .nonempty()
    .uuid({ message: "O id deve ser um UUID válido" }),
  status: z.enum(["AGUARDANDO", "ENTREGUE", "CANCELADO"]),
  address: z.string().max(200),
  date: z
    .string({ required_error: "O campo date é obrigatório (YYYY-MM-DD)" })
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "O formato da data deve ser YYYY-MM-DD",
    }),
});
const updateDeliverySchema = z.object({
  fk_id_route: z
    .string({ required_error: "O campo fk_id_route é obrigatório" })
    .nonempty()
    .uuid({ message: "O id deve ser um UUID válido" })
    .optional(),
  status: z.enum(["AGUARDANDO", "ENTREGUE", "CANCELADO"]).optional(),
  address: z.string().max(200).optional(),
  date: z
    .string({ required_error: "O campo date é obrigatório (YYYY-MM-DD)" })
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "O formato da data deve ser YYYY-MM-DD",
    })
    .optional(),
});

module.exports = {
  createDeliverySchema,
  updateDeliverySchema,
};

const z = require("zod");

const createDeliverySchema = z.object({
  fk_id_user: z
    .string({ required_error: "O campo fk_id_user é obrigatório" })
    .nonempty()
    .uuid({ message: "O id deve ser um UUID válido" }),
  status: z.enum(["AGUARDANDO", "ENTREGUE", "CANCELADO"]),
  address: z.string().max(200),
});
const updateDeliverySchema = z.object({
  fk_id_route: z
    .string({ required_error: "O campo fk_id_route é obrigatório" })
    .nonempty()
    .uuid({ message: "O id deve ser um UUID válido" })
    .optional(),
  status: z.enum(["AGUARDANDO", "ENTREGUE", "CANCELADO"]).optional(),
  address: z.string().max(200).optional(),
});

module.exports = {
  createDeliverySchema,
  updateDeliverySchema,
};

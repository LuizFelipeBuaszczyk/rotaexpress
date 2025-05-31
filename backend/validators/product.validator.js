const z = require("zod");

const createProductSchema = z.object({
  fk_id_delivery: z
    .string({ required_error: "O campo fk_id_delivery é obrigatório" })
    .nonempty()
    .uuid({ message: "O id deve ser um UUID válido" }),
  name: z
    .string({ required_error: "O campo name é obrigatório" })
    .nonempty()
    .max(100, { message: "O campo name deve ter no máximo 100 caracteres" }),
  description: z
    .string()
    .nonempty()
    .max(500, {
      message: "O campo description deve ter no máximo 500 caracteres",
    })
    .optional(),
  quantity: z
    .number({ required_error: "O campo price é obrigatório" })
    .positive({ message: "O campo price deve ser um número positivo" }),
});

const updateProductSchema = z.object({
  fk_id_delivery: z
    .string({ required_error: "O campo fk_id_delivery é obrigatório" })
    .nonempty()
    .uuid({ message: "O id deve ser um UUID válido" })
    .optional(),
  name: z
    .string()
    .nonempty()
    .max(100, { message: "O campo name deve ter no máximo 100 caracteres" })
    .optional(),
  description: z
    .string()
    .nonempty()
    .max(500, {
      message: "O campo description deve ter no máximo 500 caracteres",
    })
    .optional(),
  quantity: z
    .number()
    .positive({ message: "O campo price deve ser um número positivo" })
    .optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};

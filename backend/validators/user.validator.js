const z = require("zod");

const createUserSchema = z.object({
  name: z
    .string({ required_error: "O campo name é obrigatório" })
    .min(3)
    .max(50)
    .nonempty(),
  email: z.string({ required_error: "O campo email é obrigatório" }).email(),
  password: z
    .string({ required_error: "O campo password é obrigatório" })
    .min(6)
    .max(200),
});

const updateUserSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(200).optional(),
  cpf: z.string().min(11).max(14).optional().nullable(),
  phone_number: z.string().max(20).optional().nullable(),
});

module.exports = { createUserSchema, updateUserSchema };

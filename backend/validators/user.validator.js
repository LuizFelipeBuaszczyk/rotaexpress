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

module.exports = createUserSchema;

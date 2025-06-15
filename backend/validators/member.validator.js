const z = require("zod");

const createMemberSchema = z.object({
  email: z
    .string({ required_error: "O campo de email é obrigatório" })
    .nonempty()
});

module.exports = {
  createMemberSchema
};

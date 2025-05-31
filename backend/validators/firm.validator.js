const z = require("zod");

const createFirmSchema = z.object({
  name: z
    .string({ required_error: "O campo name é obrigatório" })
    .min(2)
    .max(50)
    .nonempty(),
  address: z
    .string({ required_error: "O campo address é obrigatório" })
    .max(250)
    .nonempty(),
});

const updateFirmSchema = z.object({
  name: z
    .string({ required_error: "O campo name é obrigatório" })
    .min(2)
    .max(50)
    .nonempty()
    .optional(),
  address: z
    .string({ required_error: "O campo address é obrigatório" })
    .max(250)
    .nonempty()
    .optional(),
});

module.exports = {
  createFirmSchema,
  updateFirmSchema,
};

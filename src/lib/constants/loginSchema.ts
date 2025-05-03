import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(""),
  password: z.string().min(1, { message: "" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

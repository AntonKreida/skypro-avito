import { z } from "zod";


export const schemaLogin = z.object({
  email: z.string({ required_error: "Укажите почту и пароль" })
    .min(1, { message: "Укажите почту и пароль" }).email({ message: "Укажите почту и пароль" }),
  password: z.string({ required_error: "Укажите почту и пароль" })
    .min(1, { message: "Укажите почту и пароль" })
});

export type TSchemaLogin = z.infer<typeof schemaLogin>;

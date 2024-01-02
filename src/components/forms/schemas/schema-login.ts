import { z } from "zod";


export const schemaLogin = z.object({
  email: z.string({ required_error: "Укажите логин и пароль" })
    .min(1, { message: "Укажите логин и пароль" }),
  password: z.string({ required_error: "Укажите логин и пароль" })
    .min(1, { message: "Укажите логин и пароль" })
});

export type TSchemaLogin = z.infer<typeof schemaLogin>;

import { z } from "zod";


export const schemaSignUp = z.object({
  email: z.string({ required_error: "Укажите почту" })
    .min(1, { message: "Укажите почту" }).email({ message: "Неверный формат почты" }),
  password: z.string({ required_error: "Укажите логин и пароль" })
    .min(1, { message: "Укажите логин и пароль" }),
  confirm: z.string({ required_error: "Укажите пароль еще раз" }).min(1, { message: "Укажите пароль еще раз" }),
  name: z.string({ required_error: "Укажите имя" }).optional(),  
  surname: z.string({ required_error: "Укажите фамилию" }).optional(),
  phone: z.string({ required_error: "Укажите телефон" }).optional(),
  city: z.string({ required_error: "Укажите город" }).optional(),  
}).refine((data) => data.password === data.confirm, {
  message: "Пароли не совпадают",
  path: ["confirm"],
});

export type TSchemaSignUp = z.infer<typeof schemaSignUp>;

import validator from "validator";
import { z } from "zod";


const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


export const schemaSignUp = z.object({
  email: z.string({ required_error: "Укажите почту" })
    .min(1, { message: "Укажите почту" }).email({ message: "Неверный формат почты" }),
  password: z.string({ required_error: "Укажите логин и пароль" })
    .min(1, { message: "Укажите логин и пароль" }),
  confirm: z.string({ required_error: "Укажите пароль еще раз" }).min(1, { message: "Укажите пароль еще раз" }),
  name: z.string({ required_error: "Укажите имя" }).optional(),  
  surname: z.string({ required_error: "Укажите фамилию" }).optional(),
  phone:  z.string({ required_error: "Укажите ваш телефон" }).regex(phoneRegex, "Не правильный формат номера")
    .optional(),
  city: z.string({ required_error: "Укажите город" }).optional(),  
}).refine((data) => data.password === data.confirm, {
  message: "Пароли не совпадают",
  path: ["confirm"],
}).refine((data) => {
  if(data.phone) {
    return validator.isMobilePhone(data?.phone.replace(/[\s()-]/g,""), ["ru-RU", "kk-KZ", "uk-UA", "be-BY"]);
  }

  return false;
}, {
  message: "Не правильный формат номера",
  path: ["phone"],
});

export type TSchemaSignUp = z.infer<typeof schemaSignUp>;

import validator from "validator";
import { z } from "zod";


export const schemaProfile = z.object({
  name: z.string({ required_error: "Укажите имя" }).optional(),  
  surname: z.string({ required_error: "Укажите фамилию" }).optional(),
  phone:  z.string({ required_error: "Укажите ваш телефон" }).optional(),
  city: z.string({ required_error: "Укажите город" }).optional(),
  avatar: z.string({ required_error: "Вставьте вашу фотографию" }).optional(),  
}).refine((data) => {
  if(data.phone) {
    return validator.isMobilePhone(data?.phone.replace(/[\s()-]/g,""), ["ru-RU", "kk-KZ", "uk-UA", "be-BY"]);
  }

  return true;
}, {
  message: "Не правильный формат номера",
  path: ["phone"],
});

export type TSchemaProfile = z.infer<typeof schemaProfile>;

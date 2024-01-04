import { z } from "zod";


export const schemaCreateAsd = z.object({
  title: z.string({ required_error: "Укажите название" })
    .min(1, { message: "Укажите название" }),
  description: z.string({ required_error: "Укажите описание" })
    .min(1, { message: "Укажите описание" }),
  price: z.number({ required_error: "Укажите цену" }).transform((value) => Number(value)),
  files: z.array(z.instanceof(FormData)).optional().nullable()  
}).refine((data) => {
  if(data.files) {
    return data.files.length > 5;
  }

  return true;
}, {
  message: "Файлов не должно быть больше 5",
  path: ["files"],
});

export type TSchemaCreateAsd = z.infer<typeof schemaCreateAsd>;

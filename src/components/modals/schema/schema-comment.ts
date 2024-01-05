import { z } from "zod";


export const schemaComment = z.object({
  text: z.string({ required_error: "Укажите ваш комментарий" })
    .min(1, { message: "Укажите ваш комментарий" }),
});

export type TSchemaComment = z.infer<typeof schemaComment>;

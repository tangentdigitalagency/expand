import * as z from "zod";

export const ExpandValidation = z.object({
  expand: z.string().nonempty().min(3, { message: 'Expand must be at least 3 characters long' }),
  accountId: z.string(),
})

export const CommentValidation = z.object({
  expand: z.string().nonempty().min(3, { message: 'Expand must be at least 3 characters long' }),
  accountId: z.string(),
})
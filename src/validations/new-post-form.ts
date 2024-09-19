import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(20, { message: 'Title must be less than 20 characters' }),
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long' })
    .max(200, { message: 'Content must be less than 200 characters' }),
  image: z.instanceof(File),
});

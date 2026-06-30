import { z } from 'zod';

export const ratingSchema = z.object({
  user_id: z.coerce.number().int().positive('User ID must be a positive integer'),
  movie_id: z.coerce.number().int().positive('Movie ID must be a positive integer'),
  score_creativity: z.coerce.number().min(0).max(10),
  score_technical: z.coerce.number().min(0).max(10),
  score_message: z.coerce.number().min(0).max(10),
  comment: z.string().trim().default(''),
  score_total: z.coerce.number().min(0).max(10),
});
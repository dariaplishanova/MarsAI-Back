import z from 'zod';

export const ratingSchema = z.object({
  user_id: z.coerce.number().int().positive(),
  movie_id: z.coerce.number().int().positive(),
  score_creativity: z.coerce.number().min(0).max(10),
  score_technical: z.coerce.number().min(0).max(10),
  score_message: z.coerce.number().min(0).max(10),
  comment: z.string().trim().min(1, 'Le commentaire est obligatoire'),
  score_total: z.coerce.number().min(0).max(10),
});

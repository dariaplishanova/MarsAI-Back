import z from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("L'ID doit être un nombre entier positif"),
});

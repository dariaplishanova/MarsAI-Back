import { z } from 'zod';

export const festivalSchema = z.object({
  name: z.string().trim().min(2, 'Nom trop court'),
  description: z.string().trim().min(10, 'Description trop courte'),
  start_at: z.coerce.date(),
  end_at: z.coerce.date(),
  status: z.enum(['Actif', 'Inactif'], { message: "Le statut doit être 'Actif' ou 'Inactif'" }),
  booking_total: z.coerce.number().int().min(0).default(0),
});

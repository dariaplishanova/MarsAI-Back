import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().trim().min(1, 'Titre requis'),
  synopsis: z.string().trim().min(10, 'Synopsis too short'),
  duration: z.coerce.number().int().min(1, 'Durée invalide'),
  language: z.string().trim().min(2, 'Langue requise'),
  video_url: z.url('URL invalide').or(z.literal('')),
  thumbnail: z.url('Lien image invalide').or(z.literal('')),
  stack: z.string().trim().default(''),
  ia_type: z.enum(['100% IA', 'Hybride'], { message: 'Type IA invalide' }),
  status: z.enum(['pending', 'in_review', 'approved', 'official_selection', 'rejected']).default('pending'),
  director_id: z.coerce.number().int().positive('ID réalisateur requis'),
});

import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().trim().min(1, 'Titre requis'),
  title_en: z.string().trim().nullable().or(z.literal('')),
  synopsis_fr: z.string().trim().min(10, 'Synopsis trop court'),
  synopsis_en: z.string().trim().min(10, 'Synopsis too short'),
  duration: z.coerce.number().int().min(1, 'Durée invalide'),
  main_language: z.string().trim().min(2, 'Langue requise'),
  yt_url: z.url('URL YouTube invalide').or(z.literal('')),
  thumbnail: z.url('Lien image invalide').or(z.literal('')),
  subtitles: z.string().trim().default('none'),
  stack: z.string().trim().default(''),
  methodology: z.string().trim().default(''),
  ia_type: z.enum(['100% IA', 'Hybride'], { message: 'Type IA invalide' }),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  director_id: z.coerce.number().int().positive('ID réalisateur requis'),
  ai_tools: z.array(z.string()).default([]),
});

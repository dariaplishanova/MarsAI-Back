import { z } from 'zod';

export const directorSchema = z.object({
  firstname: z.string().trim().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastname: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères'),
  gender: z.enum(['M.', 'Mme'], { message: 'Veuillez choisir une civilité valide (M. ou Mme)' }),
  birthday: z.iso.date({ message: 'La date de naissance doit être au format AAAA-MM-JJ' }),
  email: z.email("L'adresse email n'est pas valide"),
  mobile: z.string().trim().min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres'),
  address: z.string().trim().min(5, "L'adresse doit être plus précise (5 caractères min.)"),
  zip_code: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Le code postal doit contenir exactement 5 chiffres'),
  town: z.string().trim().min(1, 'La ville est obligatoire'),
  country: z.string().trim().min(1, 'Le pays est obligatoire'),
  job: z.string().trim().min(1, 'Le métier est obligatoire'),
  youtube_url: z.url("L'URL YouTube est mal formée").optional().or(z.literal('')),
  instagram_url: z.url("L'URL Instagram est mal formée").optional().or(z.literal('')),
  linkedin_url: z.url("L'URL LinkedIn est mal formée").optional().or(z.literal('')),
  facebook_url: z.url("L'URL Facebook est mal formée").optional().or(z.literal('')),
  twitter_url: z.url("L'URL Twitter est mal formée").optional().or(z.literal('')),
  question_about: z.enum(
    [
      'Réseaux sociaux',
      'Moteur de recherche',
      'Bouche-à-oreille',
      'Presse / Média',
      'Autre festival',
      'Partenaire',
      'Autre',
    ],
    { message: 'Veuillez sélectionner une option dans la liste' },
  ),
  newsletter: z.union([z.boolean(), z.number().min(0).max(1)], { message: 'Format de newsletter invalide' }),
});

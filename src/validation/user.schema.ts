import { z } from 'zod';

export const userSchema = z.object({
  firstname: z.string().trim().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastname: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.email("L'adresse email n'est pas valide"),

  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),

  festival_id: z.number({ message: 'Le festival_id est obligatoire' }).int().positive(),
});

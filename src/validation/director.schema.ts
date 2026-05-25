import { z } from 'zod';

export const directorSchema = z.object({
  firstname: z.string().trim().min(2, 'First name must contain at least 2 characters'),
  lastname: z.string().trim().min(2, 'Last name must contain at least 2 characters'),
  gender: z.enum(['M.', 'Mme'], { message: 'Please choose a valid civility (M. or Mme)' }),
  birthday: z.iso.date({ message: 'Birth date must be in YYYY-MM-DD format' }),
  email: z.email('Invalid email address'),
  newsletter: z.union([z.boolean(), z.number().min(0).max(1)], { message: 'Invalid newsletter format' }),
});
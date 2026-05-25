import { z } from 'zod';

export const userSchema = z.object({
  firstname: z.string().trim().min(2, 'First name must contain at least 2 characters'),
  lastname: z.string().trim().min(2, 'Last name must contain at least 2 characters'),
  email: z.email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});
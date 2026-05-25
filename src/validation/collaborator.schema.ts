import { z } from 'zod';

export const collaboratorSchema = z.object({
  firstname: z.string().trim().min(2, 'First name must be at least 2 characters'),
  lastname: z.string().trim().min(2, 'Last name must be at least 2 characters'),
  job: z.string().trim().min(2, 'Job title or role is required'),
  email: z.email('Invalid email address format'),
  movie_id: z.coerce.number().int().positive('A valid associated movie ID is required'),
});
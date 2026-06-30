import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppError } from './types/type.js';

type DBValue = string | number | boolean | Date | null;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sendError = (message: string, codeStatus: number = 400) => {
  const error = new Error(message) as AppError;
  error.status = codeStatus;
  throw error;
};

export const s = (len: number) => (len > 1 ? 's' : '');

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppError } from './types/type.js';
import logger from './config/logger.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type msgType = "error" | "warn" | "info";

export const sendError = (message: string, codeStatus: number = 400,type: msgType = "error") => {
  logger[type](message);
  const error = new Error(message) as AppError;
  error.status = codeStatus;
  throw error;
};

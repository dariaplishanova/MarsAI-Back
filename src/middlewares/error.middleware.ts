import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/type.js';

export const errorMiddleware = (err: AppError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Erreur serveur',
  });
};

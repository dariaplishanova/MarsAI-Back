import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.js';
import { AppError } from '../types/type.js';

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  const logMessage = `${status} - ${err.message} - ${req.originalUrl} - ${req.method}`;

  if (status >= 500) {
    logger.error(logMessage);
  } else {
    logger.warn(logMessage);
  }

  res.status(status).json({
    success: false,
    message: err.message || 'Erreur serveur',
  });
};

import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.js';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  const status = err.status || err.statusCode || 500;
  const logMessage = `${status} - ${err.message} - ${req.originalUrl} - ${req.method}`;

  if (status >= 500) {
    logger.error(`${logMessage}\nStack: ${err.stack}`);
  } else {
    logger.warn(logMessage);
  }

  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal Server Error' : err.message,
  });
};

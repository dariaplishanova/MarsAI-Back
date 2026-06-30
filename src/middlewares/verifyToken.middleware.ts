import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/type.js';
import logger from '../config/logger.js';
import AppError from '../errors/AppError.js';

export const verifyToken = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Splits 'Bearer <token>' to extract the hash

  if (!token) {
    throw new AppError('Access denied, missing token', 401);
  }

  // Done outside the try/catch block so a server misconfiguration throws a 500 instead of a misleading 401
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    logger.error('[Config Error]: JWT_SECRET is missing from environment variables.');
    throw new AppError('Internal Server Error', 500);
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId: number; role: string };
    
    // Injected into the request object to be used downstream by RBAC (like checkRole)
    req.user = decoded;

    return next();
  } catch (error) {
    logger.warn(`[Auth Warning]: Token validation failed - ${(error as Error).message}`);
    throw new AppError('Invalid or expired session', 401);
  }
};
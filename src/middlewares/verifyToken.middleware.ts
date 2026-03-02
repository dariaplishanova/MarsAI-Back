import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/type.js';
import { sendError } from '../utils.js';
import logger from '../config/logger.js';

export const verifyToken = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return sendError('Accès refusé, token manquant', 401);
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    const decoded = jwt.verify(token, secret) as { userId: number };
    req.user = decoded;

    next();
  } catch (error) {
    logger.error(error);
    return sendError(`Session invalide ou expirée`, 403);
  }
};

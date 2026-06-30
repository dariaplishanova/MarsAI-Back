import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserType } from '../types/type.js';
import AppError from '../errors/AppError.js';

export const checkRole = (...allowedRoles: Array<UserType['role']>) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      throw new AppError('User authentication details not found', 401);
    }

    const hasRole = allowedRoles.includes(req.user.role as UserType['role']);
    if (!hasRole) {
      throw new AppError(`Access denied. Authorized roles: ${allowedRoles.join(', ')}`, 403);
    }

    return next();
  };
};
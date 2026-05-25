import { Response } from 'express';
import logger from '../config/logger.js';
import AppError from '../errors/AppError.js';
import { RequestBody, LoginCredentials, UserType, AuthenticatedRequest } from '../types/type.js';
import * as AuthService from '../services/auth.service.js';

export const login = async (req: RequestBody<LoginCredentials>, res: Response) => {
  logger.info(`[Auth Controller]: Login attempt for email: ${req.body.email}`);

  const result = await AuthService.login(req.body);

  logger.info(`[Auth Controller]: User ID ${result.user.id} logged in successfully.`);
  return res.status(200).json({
    success: true,
    token: result.token,
    user: result.user,
  });
};

export const register = async (req: RequestBody<UserType>, res: Response) => {
  logger.info(`[Auth Controller]: Registration request received for email: ${req.body.email}`);

  const result = await AuthService.register(req.body);

  logger.info(`[Auth Controller]: New user created successfully with ID ${result.userId}.`);
  return res.status(201).json({
    success: true,
    token: result.token,
    user: result.user,
    message: 'User created successfully',
  });
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    logger.warn('[Auth Controller Warning]: Profile access rejected due to missing identifier.');
    throw new AppError('User not identified', 401);
  }

  logger.info(`[Auth Controller]: Fetching profile details for User ID ${userId}`);
  const userProfile = await AuthService.getProfile(userId);

  return res.status(200).json({
    success: true,
    user: userProfile,
  });
};

export default {
  login,
  register,
  getProfile,
};

import { Response } from 'express';
import * as UserService from '../services/user.service.js';
import { Params, RequestEmpty, RequestParams, RequestParamsBody, UserType } from '../types/type.js';
import logger from '../config/logger.js';

export const getAllUsers = async (_req: RequestEmpty, res: Response) => {
  const results = await UserService.getAllUsers();

  if (results.length === 0) {
    logger.warn('No users present in the database.');
  } else {
    logger.info(`${results.length} user(s) retrieved successfully.`);
  }

  return res.json({
    success: true,
    data: results,
    message: results.length === 0 ? 'No users found' : 'Users retrieved successfully',
  });
};

export const getOneUser = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUserById(Number(id));

  logger.info(`User: "${user.firstname} ${user.lastname}" retrieved successfully.`);
  return res.json({
    success: true,
    data: user,
  });
};

export const updateUser = async (req: RequestParamsBody<Params, Partial<UserType>>, res: Response) => {
  const { id } = req.params;
  logger.info(`[User Controller]: Received update request for User ID ${id}`);

  const results = await UserService.updateUser(Number(id), req.body);

  logger.info(`User ID ${id} modified successfully.`);
  return res.json({
    success: true,
    data: results,
    message: 'User updated successfully',
  });
};

export const deleteUser = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  logger.info(`[User Controller]: Received delete request for User ID ${id}`);

  const results = await UserService.deleteUser(Number(id));

  logger.info(`User ID ${id} deleted successfully.`);
  return res.json({
    success: true,
    data: results,
    message: 'User deleted successfully',
  });
};

export default {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
import { ResultSetHeader } from 'mysql2/promise';
import UserModel from '../models/user.model.js';
import { UserType } from '../types/type.js';
import AppError from '../errors/AppError.js';

export const getAllUsers = async (): Promise<UserType[]> => {
  return await UserModel.findAll();
};

export const getUserById = async (id: number): Promise<UserType> => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const updateUser = async (id: number, data: Partial<UserType>): Promise<ResultSetHeader> => {
  const results = await UserModel.update(id, data);

  if (results.affectedRows === 0) {
    throw new AppError(`User with ID ${id} does not exist`, 404);
  }

  return results as ResultSetHeader;
};

export const deleteUser = async (id: number): Promise<ResultSetHeader> => {
  const results = await UserModel.deleted(id);

  if (results.affectedRows === 0) {
    throw new AppError('User not found', 404);
  }

  return results as ResultSetHeader;
};
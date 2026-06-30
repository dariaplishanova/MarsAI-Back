import { ResultSetHeader } from 'mysql2/promise';
import directorModel from '../models/director.model.js';
import { DirectorType } from '../types/type.js';
import AppError from '../errors/AppError.js';

export const getAllDirectors = async (): Promise<DirectorType[]> => {
  return await directorModel.findAll();
};

export const getDirectorById = async (id: number): Promise<DirectorType> => {
  const result = await directorModel.findById(id);

  if (!result) {
    throw new AppError(`Director with ID ${id} not found`, 404);
  }

  return result;
};

export const createDirector = async (data: DirectorType): Promise<ResultSetHeader> => {
  const result = await directorModel.create(data);

  if (result.affectedRows === 0) {
    throw new AppError('Unexpected server error occurred during director creation', 500);
  }

  return result;
};
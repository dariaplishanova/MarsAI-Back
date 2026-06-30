import { ResultSetHeader } from 'mysql2/promise';
import collaboratorModel from '../models/collaborator.model.js';
import { CollaboratorType } from '../types/type.js';
import AppError from '../errors/AppError.js';

export const getAllCollaborators = async (): Promise<CollaboratorType[]> => {
  return await collaboratorModel.findAll();
};

export const getCollaboratorById = async (id: number): Promise<CollaboratorType> => {
  const collaborator = await collaboratorModel.findById(id);

  if (!collaborator) {
    throw new AppError(`Collaborator with ID ${id} not found`, 404);
  }

  return collaborator;
};

export const createCollaborator = async (data: CollaboratorType): Promise<ResultSetHeader> => {
  const results = await collaboratorModel.create(data);

  if (results.affectedRows === 0) {
    throw new AppError('Error occurred while creating the collaborator', 500);
  }

  return results;
};

export const updateCollaborator = async (id: number, data: CollaboratorType): Promise<ResultSetHeader> => {
  const existingCollaborator = await collaboratorModel.findById(id);

  if (!existingCollaborator) {
    throw new AppError(`Collaborator with ID ${id} not found`, 404);
  }

  const results = await collaboratorModel.update(id, data);

  if (results.affectedRows === 0) {
    throw new AppError('The update request could not be completed', 400);
  }

  return results;
};

export const deleteCollaborator = async (id: number): Promise<ResultSetHeader> => {
  const existingCollaborator = await collaboratorModel.findById(id);

  if (!existingCollaborator) {
    throw new AppError(`Collaborator with ID ${id} not found`, 404);
  }

  const results = await collaboratorModel.deleteById(id);

  if (results.affectedRows === 0) {
    throw new AppError('The delete request could not be completed', 400);
  }

  return results;
};
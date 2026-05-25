import { Response } from 'express';
import * as CollaboratorService from '../services/collaborator.service.js';
import logger from '../config/logger.js';
import { CollaboratorType, Params, RequestBody, RequestEmpty, RequestParams, RequestParamsBody } from '../types/type.js';

export const getAllCollaborators = async (_req: RequestEmpty, res: Response) => {
  const results = await CollaboratorService.getAllCollaborators();

  if (results.length === 0) {
    logger.warn('No collaborators found.');
  } else {
    logger.info(`${results.length} collaborator(s) found.`);
  }

  return res.json({
    success: true,
    data: results,
    message: results.length === 0 ? 'No collaborators found' : 'Collaborators retrieved successfully',
  });
};

export const getOneCollaborator = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const collaborator = await CollaboratorService.getCollaboratorById(Number(id));

  logger.info(`Collaborator: "${collaborator.firstname} ${collaborator.lastname}" found successfully.`);
  return res.json({
    success: true,
    data: collaborator,
    message: 'Collaborator retrieved successfully',
  });
};

export const createCollaborator = async (req: RequestBody<CollaboratorType>, res: Response) => {
  logger.info('[Collaborator Controller]: Attempting to create a new collaborator.');
  const result = await CollaboratorService.createCollaborator(req.body);

  logger.info('Collaborator entry created successfully.');
  return res.status(201).json({
    success: true,
    data: result,
    message: 'Collaborator created successfully',
  });
};

export const updateCollaborator = async (req: RequestParamsBody<Params, CollaboratorType>, res: Response) => {
  const { id } = req.params;
  logger.info(`[Collaborator Controller]: Received update request for Collaborator ID ${id}`);

  await CollaboratorService.updateCollaborator(Number(id), req.body);

  logger.info(`Collaborator ID ${id} updated successfully.`);
  return res.json({
    success: true,
    message: 'Collaborator updated successfully',
  });
};

export const deleteCollaborator = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  logger.info(`[Collaborator Controller]: Received delete request for Collaborator ID ${id}`);

  await CollaboratorService.deleteCollaborator(Number(id));

  logger.info(`Collaborator ID ${id} deleted successfully.`);
  return res.json({
    success: true,
    message: 'Collaborator deleted successfully',
  });
};

export default {
  getAllCollaborators,
  getOneCollaborator,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
};
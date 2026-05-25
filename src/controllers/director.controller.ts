import { Response } from 'express';
import * as DirectorService from '../services/director.service.js';
import { DirectorType, Params, RequestBody, RequestEmpty, RequestParams } from '../types/type.js';
import { s } from '../utils.js';
import logger from '../config/logger.js';

export const getAllDirectors = async (_req: RequestEmpty, res: Response) => {
  const results = await DirectorService.getAllDirectors();

  if (results.length === 0) {
    logger.warn('No directors found in the database.');
  } else {
    logger.info(`${results.length} director${s(results.length)} found.`);
  }

  return res.json({
    success: true,
    data: results,
    message: results.length === 0 ? 'No directors found' : 'Directors retrieved successfully',
  });
};

export const getDirectorById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const director = await DirectorService.getDirectorById(Number(id));

  logger.info(`Director: "${director.firstname} ${director.lastname}" retrieved successfully.`);
  return res.json({
    success: true,
    data: director,
    message: 'Director found successfully',
  });
};

export const createDirector = async (req: RequestBody<DirectorType>, res: Response) => {
  logger.info('[Director Controller]: Attempting to register a new director entry.');
  const result = await DirectorService.createDirector(req.body);

  logger.info('Director entry created successfully.');
  return res.status(201).json({
    success: true,
    data: result,
    message: 'Director created successfully',
  });
};

export default {
  getAllDirectors,
  getDirectorById,
  createDirector,
};
import { Response } from 'express';
import directorModel from '../models/director.model.js';
import { DirectorType, Params, RequestBody, RequestEmpty, RequestParams } from '../types/type.js';
import { s, sendError } from '../utils.js';
import logger from '../config/logger.js';

const getAllDirectors = async (_req: RequestEmpty, res: Response) => {
  const result = await directorModel.findAll();

  if (result.length === 0) {
    logger.info('Aucun réalisateur trouvé.');
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Aucun réalisateur trouvé.',
    });
  }

  logger.info(`${result.length} réalisateur${s(result.length)} trouvé${s(result.length)}.`);
  return res.status(200).json({
    success: true,
    data: result,
  });
};

const getDirectorById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;

  const numericId = Number(id);

  const result = await directorModel.findById(numericId);
  if (!result) {
    return sendError('Réalisateur introuvable', 404);
  }

  return res.status(200).json({
    success: true,
    data: result,
    message: 'Réalisateur trouvé ',
  });
};

const createDirector = async (req: RequestBody<DirectorType>, res: Response) => {
  const result = await directorModel.create(req.body);

  if (result.affectedRows === 0) {
    return sendError("Échec inattendu côté serveur lors de l\'insertion.", 500);
  }

  return res.status(201).json({ success: true, data: result });
};

export default {
  getAllDirectors,
  getDirectorById,
  createDirector,
};

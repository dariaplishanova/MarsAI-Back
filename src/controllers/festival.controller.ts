import { Response } from 'express';
import festivalModel from '../models/festival.model.js';
import { FestivalType, Params, RequestBody, RequestEmpty, RequestParams, RequestParamsBody } from '../types/type.js';
import { sendError } from '../utils.js';
import logger from '../config/logger.js';

const getAllFestivals = async (_req: RequestEmpty, res: Response) => {
  const results = await festivalModel.findAll();
  if (results.length === 0) {
    logger.error('Aucun festival dans la base de donné');
    sendError('Aucun festival dans la base de donné');
  }

  logger.info(`${results.length} festiva${results.length ? 'l' : 'ux'} récupéré.`);
  return res.status(200).json({
    success: true,
    data: results,
  });
};
//--------------------------------------------------------------------------------

const getFestivalById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;

  const festival = await festivalModel.findById(id);

  if (!festival) {
    logger.error('Aucun festival trouvé');
    return sendError('Aucun festinal trouvé.');
  }

  logger.info(`Festival "${festival.name}" récupéré avec succès.`);
  res.status(200).json(festival);
};

//--------------------------------------------------------------------------------

const createFestival = async (req: RequestBody<FestivalType>, res: Response) => {
  const festival: FestivalType = req.body;

  const results = await festivalModel.create(festival);
  if (results.affectedRows === 0) {
    logger.error('Error lors d ela création du festival.');
    return sendError('Erreur lors de la création du Festival');
  }

  logger.info(`Le festival ${festival.name} a été créé.`);
  return res.status(201).json({
    success: true,
    data: results,
    message: 'Festival créé avec succès',
  });
};
//--------------------------------------------------------------------------------

const updateFestival = async (req: RequestParamsBody<Params, Partial<FestivalType>>, res: Response) => {
  const { id } = req.params;
  const festival = req.body;

  const results = await festivalModel.update(id, festival);
  if (results.affectedRows === 0) {
    logger.error("Le festival n'a pas été trouvé.");
    return sendError("Le festival n'a pas été trouvé.");
  }

  logger.info(`Le festival ${festival.name} a été modifié.`);
  res.status(201).json({
    success: true,
    message: 'Festival mis à jour avec succès',
  });
};
//--------------------------------------------------------------------------------

const deleteFestival = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;

  const results = await festivalModel.deleted(id);
  if (results.affectedRows === 0) {
    logger.error("Le festival n'a pas été trouvé.");
    return sendError("Le festival n'a pas été trouvé.");
  }

  logger.info(`Le festival ${id} a été créé.`);
  res.status(200).json({ message: 'Festival supprimé avec succès' });
};
//--------------------------------------------------------------------------------
export default {
  getAllFestivals,
  getFestivalById,
  createFestival,
  updateFestival,
  deleteFestival,
};

import { Response } from 'express';
import festivalModel from '../models/festival.model.js';
import { FestivalType, Params, RequestBody, RequestEmpty, RequestParams, RequestParamsBody } from '../types/type.js';
import { s, sendError } from '../utils.js';
import logger from '../config/logger.js';

const getAllFestivals = async (_req: RequestEmpty, res: Response) => {
  const results = await festivalModel.findAll();

  if (results.length === 0) {
    logger.info(`Aucun festival n'a été trouvé.`);
    return res.status(200).json({
      success: true,
      data: [],
      message: "Aucun festival n'a été trouvé.",
    });
  }

  logger.info(`${results.length} festival${s(results.length)} récupéré${s(results.length)}.`);
  return res.status(200).json({
    success: true,
    data: results,
  });
};

const getFestivalById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);

  const festival = await festivalModel.findById(numericId);

  if (!festival) {
    return sendError("Aucun festinal n'a été trouvé.", 404);
  }

  logger.info(`Festival "${festival.name}" récupéré avec succès.`);
  res.status(200).json({
    success: true,
    data: festival,
  });
};

const createFestival = async (req: RequestBody<FestivalType>, res: Response) => {
  const festival = req.body;

  const results = await festivalModel.create(festival);
  if (results.affectedRows === 0) {
    return sendError('Erreur lors de la création du Festival', 500);
  }

  logger.info(`Le festival ${festival.name} a été créé.`);
  return res.status(201).json({
    success: true,
    data: results,
    message: 'Festival créé avec succès',
  });
};

const updateFestival = async (req: RequestParamsBody<Params, Partial<FestivalType>>, res: Response) => {
  const { id } = req.params;
  const festival = req.body;

  const numericId = Number(id);

  const results = await festivalModel.update(numericId, festival);

  if (results.affectedRows === 0) {
    const exists = await festivalModel.findById(numericId);

    if (!exists) {
      logger.warn(`Tentative de modification d'un festival inexistant (ID: ${numericId})`);
      return sendError("Le festival n'a pas été trouvé.", 404);
    }

    return res.status(200).json({
      success: true,
      message: 'Aucun changement nécessaire (données identiques)',
    });
  }

  logger.info(`Le festival ${festival.name} a été modifié.`);
  res.status(200).json({
    success: true,
    message: 'Festival mis à jour avec succès',
  });
};

const deleteFestival = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);

  const results = await festivalModel.deleted(numericId);

  if (results.affectedRows === 0) {
    return sendError("Le festival n'a pas été trouvé.", 404);
  }

  logger.info(`Le festival avec l'id ${numericId} a été supprimé.`);
  res.status(200).json({ message: 'Festival supprimé avec succès' });
};

export default {
  getAllFestivals,
  getFestivalById,
  createFestival,
  updateFestival,
  deleteFestival,
};

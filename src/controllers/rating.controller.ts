import { Response } from 'express';
import logger from '../config/logger.js';
import RatingModel from '../models/rating.model.js';
import { RatingType, RequestBody } from '../types/type.js';
import { sendError } from '../utils.js';

const createRating = async (req: RequestBody<RatingType>, res: Response) => {
  const results = await RatingModel.createRating(req.body);

  if (results.affectedRows === 0) {
    return sendError("Échec inattendu côté serveur lors de l\'insertion.", 500);
  }

  const userId = results.insertId;
  logger.info(`L'évaluation à été créée avec l'id ${userId}.`);

  return res.status(201).json({
    success: true,
    data: { userId, ...results },
    message: 'Evaluation enregistrée avec succès',
  });
};

export default {
  createRating,
};

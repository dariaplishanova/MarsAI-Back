import { Response } from 'express';
import logger from '../config/logger.js';
import RatingModel from '../models/rating.model.js';
import { RatingType, RequestBody } from '../types/type.js';
import { sendError } from '../utils.js';

const createRating = async (req: RequestBody<RatingType>, res: Response) => {
  const ratingData = req.body;

  const results = await RatingModel.createRating(ratingData);

  if (results.affectedRows === 0) {
    return sendError("Échec inattendu côté serveur lors de l'insertion.", 500);
  }

  logger.info(`L'évaluation a été créée pour le film ${ratingData.movie_id} par le jury ${ratingData.user_id}.`);

  return res.status(201).json({
    success: true,
    data: ratingData,
    message: 'Evaluation enregistrée avec succès',
  });
};

export default {
  createRating,
};
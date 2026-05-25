import { Response } from 'express';
import logger from '../config/logger.js';
import * as RatingService from '../services/rating.service.js';
import { RatingType, RequestBody } from '../types/type.js';

export const createRating = async (req: RequestBody<RatingType>, res: Response) => {
  const ratingData = req.body;

  logger.info(`[Rating Controller]: Attempting to submit a new score payload for Movie ID ${ratingData.movie_id}`);
  
  await RatingService.createRating(ratingData);

  logger.info(`Rating successfully created for Movie ID ${ratingData.movie_id} by Jury User ID ${ratingData.user_id}.`);

  return res.status(201).json({
    success: true,
    data: ratingData,
    message: 'Rating recorded successfully',
  });
};

export default {
  createRating,
};
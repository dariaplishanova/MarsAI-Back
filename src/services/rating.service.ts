import { ResultSetHeader } from 'mysql2/promise';
import RatingModel from '../models/rating.model.js';
import { RatingType } from '../types/type.js';
import AppError from '../errors/AppError.js';

export const createRating = async (ratingData: RatingType): Promise<ResultSetHeader> => {
  const results = await RatingModel.createRating(ratingData);

  if (results.affectedRows === 0) {
    throw new AppError('Unexpected server error occurred during rating creation', 500);
  }

  return results;
};
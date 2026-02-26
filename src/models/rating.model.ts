import { ResultSetHeader } from 'mysql2/promise';
import { RatingType } from '../types/type.js';
import db from '../config/database.js';
import { insertEntity } from '../utils.js';

const createRating = async (rating: RatingType): Promise<ResultSetHeader> => {
  const columns: (keyof RatingType)[] = [
    'user_id',
    'movie_id',
    'score_creativity',
    'score_technical',
    'score_message',
    'comment',
    'score_total',
  ];

  return insertEntity('rating', rating, columns, db);
};

export default {
  createRating,
};

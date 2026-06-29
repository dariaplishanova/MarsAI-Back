import { ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { RatingRow, RatingType } from '../types/type.js';

const findAll = async (): Promise<RatingRow[]> => {
  const query = 'SELECT score_creativity, score_technical, score_message, comment, score_total, created_at FROM rating';
  const [rows] = await db.execute<RatingRow[]>(query);
  return rows;
};

const createRating = async (rating: RatingType): Promise<ResultSetHeader> => {
  const query = `
    INSERT INTO rating (user_id, movie_id, score_creativity, score_technical, score_message, comment, score_total)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute<ResultSetHeader>(query, [
    rating.user_id,
    rating.movie_id,
    rating.score_creativity,
    rating.score_technical,
    rating.score_message,
    rating.comment,
    rating.score_total,
  ]);

  await db.execute(`UPDATE movie SET status = 'approved' WHERE id = ?`, [rating.movie_id]);

  return result;
};

export default {
  findAll,
  createRating,
};

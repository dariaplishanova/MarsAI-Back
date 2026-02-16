import db from '../config/database.js';
import { MovieType } from '../types/type.js';

const findAll = async () => {
  const [result] = await db.execute('SELECT * FROM movie');
  return result as MovieType[];
};
//--------------------------------------------------------------------------------

const findById = async (id: number) => {
  const [result] = await db.execute('SELECT * FROM movie WHERE id = ?', [id]);
  return result as MovieType[];
};
//--------------------------------------------------------------------------------
const create = async (movie: MovieType) => {
  const query =
    'INSERT INTO movie (title, yt_url, thumbnail, subtitles, stack, created_at, director_id,) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const [result] = await db.execute(query, [
    movie.title,
    movie.yt_url,
    movie.thumbnail,
    movie.subtitles,
    movie.stack,
    movie.created_at,
    movie.director_id,
  ]);
  return result as MovieType[];
};
//--------------------------------------------------------------------------------

export default {
  findAll,
  findById,
  create,
};

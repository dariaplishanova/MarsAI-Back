import { ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { MovieRow, MovieType } from '../types/type.js';
import { insertEntity, updateEntity } from '../utils.js';

const findAll = async (): Promise<MovieType[]> => {
  const [result] = await db.execute<MovieRow[]>('SELECT * FROM movie');
  return result;
};

const findById = async (id: number): Promise<MovieType | null> => {
  const [rows] = await db.execute<MovieRow[]>('SELECT * FROM movie WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

const columns: (keyof MovieType)[] = [
  'title',
  'title_en',
  'synopsis_fr',
  'synopsis_en',
  'duration',
  'main_language',
  'yt_url',
  'thumbnail',
  'subtitles',
  'stack',
  'methodology',
  'ia_type',
  'status',
  'created_at',
  'director_id',
];

const create = async (movie: MovieType): Promise<ResultSetHeader> => {
  return insertEntity('movie', movie, columns, db);
};

const update = async (id: number, data: Partial<MovieType>): Promise<ResultSetHeader> => {
  return updateEntity('movie', id, data, columns, db);
};

export default {
  findAll,
  findById,
  create,
  update,
};

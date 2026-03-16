import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { MovieRow, MovieType } from '../types/type.js';
import { insertEntity, updateEntity } from '../utils.js';

const findAll = async (): Promise<MovieRow[]> => {
  const query = `
    SELECT 
      m.*, 
      d.firstname AS director_firstname, 
      d.lastname AS director_lastname
    FROM movie m
    LEFT JOIN director d ON m.director_id = d.id
    WHERE m.status = 'approved'
  `;
  const [rows] = await db.execute<MovieRow[]>(query);
  return rows;
};

const findAllForJury = async (): Promise<MovieRow[]> => {
  const query = `
    SELECT 
      m.*, 
      d.firstname AS director_firstname, 
      d.lastname AS director_lastname,
      GROUP_CONCAT(i.url) AS gallery_urls
    FROM movie m
    LEFT JOIN director d ON m.director_id = d.id
    LEFT JOIN image i ON m.id = i.movie_id
    WHERE m.status = 'in_review'
    GROUP BY m.id, d.firstname, d.lastname
  `;
  const [rows] = await db.execute<MovieRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<MovieType | null> => {
  const query = `
    SELECT 
      m.*, 
      d.firstname AS director_firstname, 
      d.lastname AS director_lastname
    FROM movie m
    LEFT JOIN director d ON m.director_id = d.id
    WHERE m.id = ?
  `;
  const [rows] = await db.execute<MovieRow[]>(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const columns: (keyof MovieType)[] = [
  'title',
  'title_en',
  'synopsis_fr',
  'synopsis_en',
  'duration',
  'language',
  'video_url',
  'thumbnail',
  'subtitles',
  'stack',
  'methodology',
  'ia_type',
  'status',
  'director_id',
];

const create = async (movie: MovieType, connection: Pool | PoolConnection = db): Promise<ResultSetHeader> => {
  return insertEntity('movie', movie, columns, connection);
};

const update = async (id: number, data: Partial<MovieType>): Promise<ResultSetHeader> => {
  return updateEntity('movie', id, data, columns, db);
};

export default {
  findAll,
  findAllForJury,
  findById,
  create,
  update,
};

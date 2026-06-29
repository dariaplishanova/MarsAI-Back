import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { MovieType, MovieRow } from '../types/type.js';

type DBContext = Pool | PoolConnection;

const findAll = async (): Promise<MovieRow[]> => {
  const query = `
    SELECT m.*, d.firstname AS director_firstname, d.lastname AS director_lastname
    FROM movie m
    LEFT JOIN director d ON m.director_id = d.id
    WHERE m.status = 'approved'
  `;
  const [rows] = await db.execute<MovieRow[]>(query);
  return rows;
};

const findAllForAdmin = async (): Promise<MovieRow[]> => {
  const query = `
    SELECT m.*, d.firstname AS director_firstname, d.lastname AS director_lastname, d.country AS country, d.created_at AS created_at,

      (SELECT GROUP_CONCAT(i.url) FROM image i WHERE i.movie_id = m.id) AS gallery_urls,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT(
        'id', c.id,
        'firstname', c.firstname,
        'lastname', c.lastname,
        'job', c.job,
        'email', c.email
      ))
      FROM collaborator c WHERE c.movie_id = m.id) AS collaborators,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT(
        'score_creativity', r.score_creativity,
        'score_technical', r.score_technical,
        'score_message', r.score_message,
        'score_total', r.score_total,
        'comment', r.comment,
        'jury_firstname', u.firstname,
        'jury_lastname', u.lastname
      ))
      FROM rating r
      JOIN user u ON r.user_id = u.id
      WHERE r.movie_id = m.id) AS ratings
    FROM movie m
    LEFT JOIN director d ON m.director_id = d.id
    ORDER BY m.created_at DESC
  `;

  const [rows] = await db.execute<MovieRow[]>(query); 
  return rows;
};

const findAllForJury = async (): Promise<MovieRow[]> => {
  const query = `
    SELECT m.*, d.firstname AS director_firstname, d.lastname AS director_lastname,
      (SELECT GROUP_CONCAT(i.url) FROM image i WHERE i.movie_id = m.id) AS gallery_urls
    FROM movie m
    LEFT JOIN director d ON m.director_id = d.id
    WHERE m.status = 'in_review'
  `;
  const [rows] = await db.execute<MovieRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<MovieRow | null> => {
  const query = `
    SELECT m.*, d.firstname AS director_firstname, d.lastname AS director_lastname
    FROM movie m
    LEFT JOIN director d ON m.director_id = d.id
    WHERE m.id = ?
  `;
  const [rows] = await db.execute<MovieRow[]>(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Change db.execute to ctx.execute to use the right transaction context!
const create = async (movie: MovieType, ctx: DBContext = db): Promise<ResultSetHeader> => {
  const query = `
    INSERT INTO movie (title, duration, language, video_url, thumbnail, synopsis, stack, ia_type, status, director_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await ctx.execute<ResultSetHeader>(query, [
    movie.title,
    movie.duration,
    movie.language,
    movie.video_url,
    movie.thumbnail,
    movie.synopsis,
    movie.stack,
    movie.ia_type,
    movie.status ?? 'in_review',
    movie.director_id,
  ]);
  return result;
};

const updateStatus = async (id: number, status: string): Promise<ResultSetHeader> => {
  const query = `
    UPDATE movie SET  status = ? WHERE id = ?
  `;
  const [result] = await db.execute<ResultSetHeader>(query, [status, id]);
  return result;
};

export default {
  findAll,
  findAllForAdmin,
  findAllForJury,
  findById,
  create,
  updateStatus,
};

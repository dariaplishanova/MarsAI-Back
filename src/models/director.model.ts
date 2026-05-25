import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { DirectorType, DirectorRow } from '../types/type.js';

type DBContext = Pool | PoolConnection;

const findAll = async (): Promise<DirectorRow[]> => {
  const query = 'SELECT * FROM director';
  const [rows] = await db.execute<DirectorRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<DirectorRow | null> => {
  const query = 'SELECT * FROM director WHERE id = ?';
  const [rows] = await db.execute<DirectorRow[]>(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const create = async (director: DirectorType, ctx: DBContext = db): Promise<ResultSetHeader> => {
  const query = `
    INSERT INTO director (firstname, lastname, gender, birthday, email, country, newsletter)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await ctx.execute<ResultSetHeader>(query, [
    director.firstname,
    director.lastname,
    director.gender,
    director.birthday,
    director.email,
    director.country,
    director.newsletter ? 1 : 0,
  ]);
  return result;
};

export default {
  findAll,
  findById,
  create,
};

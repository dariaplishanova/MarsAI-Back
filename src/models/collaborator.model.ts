import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { CollaboratorRow, CollaboratorType } from '../types/type.js';

type DBContext = Pool | PoolConnection;

const findAll = async (): Promise<CollaboratorType[]> => {
  const query = `SELECT * FROM collaborator`;
  const [rows] = await db.execute<CollaboratorRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<CollaboratorType | null> => {
  const query = `SELECT * FROM collaborator WHERE id = ?`;
  const [rows] = await db.execute<CollaboratorRow[]>(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const create = async (collaborator: CollaboratorType, ctx: DBContext = db): Promise<ResultSetHeader> => {
  const query = `
    INSERT INTO collaborator (firstname, lastname, email, job, movie_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await ctx.execute<ResultSetHeader>(query, [
    collaborator.firstname,
    collaborator.lastname,
    collaborator.email,
    collaborator.job,
    collaborator.movie_id,
  ]);
  return result;
};

const update = async (id: number, data: CollaboratorType): Promise<ResultSetHeader> => {
  const query = `
    UPDATE collaborator 
    SET firstname = ?, lastname = ?, email = ?, job = ?, movie_id = ? 
    WHERE id = ?
  `;
  const [result] = await db.execute<ResultSetHeader>(query, [
    data.firstname,
    data.lastname,
    data.email,
    data.job,
    data.movie_id,
    id,
  ]);
  return result;
};

const deleteById = async (id: number): Promise<ResultSetHeader> => {
  const query = `DELETE FROM collaborator WHERE id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, [id]);
  return result;
};

export default {
  findAll,
  findById,
  create,
  update,
  deleteById,
};

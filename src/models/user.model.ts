import { ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { UserType, UserRow } from '../types/type.js';

const findAll = async (): Promise<UserRow[]> => {
  const query = 'SELECT * FROM user';
  const [rows] = await db.execute<UserRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<UserRow | null> => {
  const query = 'SELECT * FROM user WHERE id = ?';
  const [rows] = await db.execute<UserRow[]>(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const findByEmail = async (email: string): Promise<UserRow | null> => {
  const query = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await db.execute<UserRow[]>(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};

const create = async (user: UserType): Promise<ResultSetHeader> => {
  const query = `
    INSERT INTO user (firstname, lastname, email, password, role) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute<ResultSetHeader>(query, [
    user.firstname,
    user.lastname,
    user.email,
    user.password ?? '',
    user.role ?? 'jury',
  ]);
  return result;
};

const update = async (id: number, data: Partial<UserType>): Promise<ResultSetHeader> => {
  const query = `
    UPDATE user 
    SET firstname = ?, lastname = ?, email = ?, password = ?, updated_at = NOW() 
    WHERE id = ?
  `;
  const [result] = await db.execute<ResultSetHeader>(query, [
    data.firstname || null,
    data.lastname || null,
    data.email || null,
    data.password || null,
    id,
  ]);
  return result;
};

const deleted = async (id: number): Promise<ResultSetHeader> => {
  const query = 'DELETE FROM user WHERE id = ?';
  const [result] = await db.execute<ResultSetHeader>(query, [id]);
  return result;
};

export default {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  deleted,
};

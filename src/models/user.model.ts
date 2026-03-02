import { ResultSetHeader } from 'mysql2';
import db from '../config/database.js';
import { UserRow, UserType } from '../types/type.js';

const findAll = async (): Promise<UserRow[]> => {
  const query = 'SELECT * FROM user';
  const [rows] = await db.execute<UserRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<UserRow | null> => {
  const query = 'SELECT * FROM user WHERE id = ?';
  const [result] = await db.execute<UserRow[]>(query, [id]);
  return result.length > 0 ? result[0] : null;
};

const findByEmail = async (email: string): Promise<UserType | null> => {
  const query = 'SELECT * FROM user WHERE email = ?';
  const [result] = await db.execute<UserRow[]>(query, [email]);
  return result.length > 0 ? result[0] : null;
};

const update = async (id: number, data: Partial<UserType>): Promise<ResultSetHeader> => {
  const query =
    'UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?, updated_at = NOW(), festival_id = ? WHERE id = ?';

  const [result] = await db.execute<ResultSetHeader>(query, [
    data.firstname || null,
    data.lastname || null,
    data.email || null,
    data.password || null,
    data.festival_id || null,
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
  update,
  deleted,
};

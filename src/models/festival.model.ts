import db from '../config/database.js';
import { ResultSetHeader } from 'mysql2';
import { FestivalRow, FestivalType } from '../types/type.js';

const findAll = async (): Promise<FestivalRow[]> => {
  const [result] = await db.execute<FestivalRow[]>('SELECT * FROM festival');
  return result;
};

//--------------------------------------------------------------------------------

const findById = async (id: number): Promise<FestivalRow | null> => {
  const [result] = await db.execute<FestivalRow[]>('SELECT * FROM festival WHERE id = ?', [id]);
  return result.length > 0 ? result[0] : null;
};

//--------------------------------------------------------------------------------

const create = async (festival: FestivalType): Promise<ResultSetHeader> => {
  const query =
    'INSERT INTO festival (name, description, created_at, start_at, end_at, status, booking_total) VALUES (?, ?, NOW(), ?, ?, ?,? )';
  const [result] = await db.execute<ResultSetHeader>(query, [
    festival.name,
    festival.description,
    festival.start_at,
    festival.end_at,
    festival.status,
    festival.booking_total,
  ]);
  return result;
};

//--------------------------------------------------------------------------------

const update = async (id: number, data: Partial<FestivalType>): Promise<ResultSetHeader> => {
  const query = `UPDATE festival SET name = ?, description = ?, start_at = ?, end_at = ?, status = ?, booking_total = ? WHERE id = ?`;
  const [result] = await db.execute<ResultSetHeader>(query, [
    data.name || null,
    data.description || null,
    data.start_at || null,
    data.end_at || null,
    data.status || null,
    data.booking_total || null,
    id,
  ]);
  return result;
};

//--------------------------------------------------------------------------------

const deleted = async (id: number): Promise<ResultSetHeader> => {
  const [result] = await db.execute<ResultSetHeader>(`DELETE FROM festival WHERE id = ?`, [id]);
  return result;
};

//--------------------------------------------------------------------------------

export default {
  findAll,
  findById,
  create,
  update,
  deleted,
};

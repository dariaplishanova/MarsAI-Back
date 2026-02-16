import db from '../config/database.js';
import { FestivalType } from '../types/type.js';

const findAll = async () => {
  const [result] = await db.execute('SELECT * FROM festival');
  return result as FestivalType[];
};
//--------------------------------------------------------------------------------

const findById = async (id: number) => {
  const [result] = await db.execute('SELECT * FROM festival WHERE id = ?', [
    id,
  ]);
  return result as FestivalType[];
};
//--------------------------------------------------------------------------------

const create = async (festival: FestivalType) => {
  const query =
    'INSERT INTO festival (name, description, created_at, start_at, end_at, status, booking_total) VALUES (?, ?, NOW(), ?, ?, ?,? )';
  const [result] = await db.execute(query, [
    festival.name,
    festival.description,
    festival.start_at,
    festival.end_at,
    festival.status,
    festival.booking_total,
  ]);
  return result as FestivalType[];
};
//--------------------------------------------------------------------------------

const update = async (id: number, data: FestivalType) => {
  const query = `UPDATE festival SET name = ?, description = ?, start_at = ?, end_at = ?, status = ?, booking_total = ? WHERE id = ?`;
  const [result] = await db.execute(query, [
    data.name,
    data.description,
    data.start_at,
    data.end_at,
    data.status,
    data.booking_total,
    id,
  ]);
  return result as FestivalType[];
};
//--------------------------------------------------------------------------------

const deleted = async (id: number) => {
  const [result] = await db.execute(`DELETE FROM festival WHERE id = ?`, [id]);
  return result as FestivalType[];
};
//--------------------------------------------------------------------------------

export default {
  findAll,
  findById,
  create,
  update,
  deleted,
};

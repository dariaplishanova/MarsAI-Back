import db from '../config/database.js';
import { MovieType } from '../types/type.js';

const findAll = async () => {
  const [result] = await db.execute('SELECT * FROM movie')
  return result as MovieType[]
};
//--------------------------------------------------------------------------------

const findById = async (id: number) => {
  const [result] = await db.execute('SELECT * FROM movie WHERE id = ?', [id])
  return result as MovieType[]
};
//--------------------------------------------------------------------------------
const create = async (title: string, description: string, release_date: string, duration: number, rating: number, festival_id: number) => {
  const query = 'INSERT INTO movie (title, description, release_date, duration, rating, festival_id) VALUES (?, ?, ?, ?, ?, ?)';
  const [result] = await db.execute(query, [title, description, release_date, duration, rating, festival_id]);
  return result as MovieType[]
};
//--------------------------------------------------------------------------------

export default {
  findAll,
  findById,
  create
}

 
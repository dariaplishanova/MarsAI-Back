import db from '../config/database.js';

const findAll = async () => {
  const [result] = await db.execute('SELECT * FROM movie')
  return result;
};
//--------------------------------------------------------------------------------

const findById = async (id: string) => {
  const [result] = await db.execute('SELECT * FROM movie WHERE id = ?', [id])
  return result
};
//--------------------------------------------------------------------------------

export default {
  findAll,
  findById
}

 
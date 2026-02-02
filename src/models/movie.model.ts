import db from '../config/database.js';

const findAll = async () => {
  const [rows] = await db.execute('SELECT * FROM movie')
  return rows
}

export default {
  findAll
}

 
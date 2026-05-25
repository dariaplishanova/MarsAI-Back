import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import db from '../config/database.js';
import { ImageType } from '../types/type.js';

type DBContext = Pool | PoolConnection;

const create = async (image: ImageType, ctx: DBContext = db): Promise<ResultSetHeader> => {
  const query = `INSERT INTO image (url, movie_id) VALUES (?, ?)`;
  const [result] = await ctx.execute<ResultSetHeader>(query, [image.url, image.movie_id]);
  return result;
};

export default {
  create,
};

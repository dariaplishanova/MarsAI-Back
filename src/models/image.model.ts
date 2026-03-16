import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { ImageType } from '../types/type.js';
import db from '../config/database.js';
import { insertEntity } from '../utils.js';

const create = async (image: ImageType, connection: Pool | PoolConnection = db): Promise<ResultSetHeader> => {
  const columns: (keyof ImageType)[] = ['url', 'movie_id'];
  return insertEntity('image', image, columns, connection);
};

export default { create };

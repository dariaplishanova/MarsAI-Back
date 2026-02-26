import { ResultSetHeader } from 'mysql2';
import db from '../config/database.js';
import { DirectorRow, DirectorType } from '../types/type.js';
import { insertEntity } from '../utils.js';

const findAll = async (): Promise<DirectorType[]> => {
  const query = 'SELECT * FROM director';
  const [rows] = await db.execute<DirectorRow[]>(query);
  return rows;
};

const findById = async (id: number): Promise<DirectorType | null> => {
  const query = 'SELECT * FROM director WHERE id = ?';
  const [result] = await db.execute<DirectorRow[]>(query, [id]);
  return result.length > 0 ? result[0] : null;
};

const create = async (director: DirectorType): Promise<ResultSetHeader> => {
  const columns: (keyof DirectorType)[] = [
    'firstname',
    'lastname',
    'gender',
    'birthday',
    'email',
    'mobile',
    'address',
    'zip_code',
    'town',
    'country',
    'job',
    'youtube_url',
    'instagram_url',
    'linkedin_url',
    'facebook_url',
    'twitter_url',
    'question_about',
    'newsletter',
  ];

  return insertEntity('director', director, columns, db);
};

export default {
  findAll,
  findById,
  create,
};

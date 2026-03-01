import { UserType } from '../types/type.js';
import db from '../config/database.js';
import { ResultSetHeader } from 'mysql2';

const create = async (user: UserType): Promise<ResultSetHeader> => {
  // Les colonnes created_at et updated_at sont retirées car la DB les remplit seule
  const query = `
    INSERT INTO user (firstname, lastname, email, password, role, festival_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute<ResultSetHeader>(query, [
    user.firstname,
    user.lastname,
    user.email,
    user.password ?? '',
    user.role ?? 'user',
    user.festival_id ?? 1,
  ]);

  return result;
};

export default {
  create,
};

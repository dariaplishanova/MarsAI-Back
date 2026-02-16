import { LoginType, UserType } from '../types/type.js';
import db from '../config/database.js';

const create = async (user: UserType) => {
  const query =
    'INSERT INTO user (firstname, lastname, email, password, created_at,updated_at, festival_id) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)';
  const [result] = await db.execute(query, [
    user.firstname,
    user.lastname,
    user.email,
    user.hashedPassword,
    user.festival_id,
  ]);
  return result as UserType[];
};

export const findByEmail = async (email: string) => {
  const query = 'SELECT * FROM user WHERE email = ?';
  const [result] = await db.execute(query, [email]);
  return result as LoginType[];
};
export default {
  findByEmail,
  create,
};

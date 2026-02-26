import db from '../config/database.js';
import { CollaboratorType } from '../types/type.js';

const findAll = async () => {
  const query = 'SELECT * FROM collaborator';
  const [result] = await db.execute(query);
  return result as CollaboratorType[];
};
//--------------------------------------------------------------------------------

const findOne = async (id: number) => {
  const query = 'SELECT * FROM collaborator WHERE id = ?';
  const [result] = await db.execute(query, [id]);
  return result as CollaboratorType[];
};

//--------------------------------------------------------------------------------

const create = async (collaborator: CollaboratorType) => {
  const query =
    'INSERT INTO collaborator (firstname, lastname, gender, email, job, movie_id) VALUES (?, ?, ?, ?, ?, ?)';
  const [result] = await db.execute(query, [
    collaborator.firstname,
    collaborator.lastname,
    collaborator.gender,
    collaborator.email,
    collaborator.job,
    collaborator.movie_id,
  ]);
  return result as CollaboratorType[];
};
//--------------------------------------------------------------------------------

const update = async (id: number, data: CollaboratorType) => {
  const query =
    'UPDATE collaborator SET firstname = ?, lastname = ?, gender = ?, email = ?, job = ?, movie_id = ? WHERE id = ?';
  const [result] = await db.execute(query, [
    data.firstname,
    data.lastname,
    data.gender,
    data.email,
    data.job,
    data.movie_id,
    id,
  ]);
  return result as CollaboratorType[];
};
//--------------------------------------------------------------------------------

const deleted = async (id: number) => {
  const query = `DELETE FROM collaborator WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result as CollaboratorType[];
};
//--------------------------------------------------------------------------------

export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
};

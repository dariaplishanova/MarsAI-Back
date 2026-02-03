import { ResultSetHeader } from 'mysql2';
import db from '../config/database.js';

const findAll = async () => {
    const [result] = await db.execute('SELECT * FROM collaborator')
    return result;
}
//--------------------------------------------------------------------------------

const findOne = async (id: string | string[]) => {
    const [result] = await db.execute('SELECT * FROM collaborator WHERE id = ?',[id])
    return result;
}
//--------------------------------------------------------------------------------

const create = async (firstname: string,lastname: string, gender: string, email: string, job: string, movie_id: number) => {
    const query = 'INSERT INTO collaborator (firstname, lastname, gender, email, job, movie_id) VALUES (?, ?, ?, ?, ?, ?)';     
    const [result] = await db.execute( query, [firstname, lastname , gender, email, job, movie_id] );
    return result;
}
//--------------------------------------------------------------------------------

const update = async (id:  string | string[], data: { firstname: string, lastname: string, gender: string, email: string, job: string, movie_id: number }) => {
    const query = "UPDATE collaborator SET firstname = ?, lastname = ?, gender = ?, email = ?, job = ?, movie_id = ? WHERE id = ?"; 
    const [result] = await db.execute( query, [data.firstname, data.lastname, data.gender, data.email, data.job, data.movie_id, id]);
    return result;
}
//--------------------------------------------------------------------------------

const deleted = async (id: string): Promise<ResultSetHeader> => {
    const query = `DELETE FROM collaborator WHERE id = ?`;
    const [result] = await db.execute<ResultSetHeader>(query, [id]);  
    return result;
}
//--------------------------------------------------------------------------------

export default {
    findAll,
    findOne,
    create,
    update,
    deleted
}

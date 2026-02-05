import db from '../config/database.js';
import { UserType } from '../types/type.js';


const findAll = async () => {
    const query = "SELECT * FROM user";
    const  [result] = await db.execute(query)
    return result as UserType[];
};
//--------------------------------------------------------------------------------

const findOne = async (id: number) => {
    const query = "SELECT * FROM user WHERE id = ?";
    const  [result] = await db.execute(query, [id])
    return result as UserType[];
};
//--------------------------------------------------------------------------------


const create = async (user: UserType) => {
    const query = "INSERT INTO user (firstname, lastname, email, password, created_at,updated_at, festival_id) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)";
    const [result] = await db.execute(query, [user.firstname, user.lastname, user.email, user.password, user.festival_id]);
    return result as UserType[];
};
//--------------------------------------------------------------------------------


const update = async (id: number, data: {firstname: string, lastname: string, email: string, password: string, festival_id: number}) => {
const query  = "UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?, updated_at = NOW(), festival_id = ? WHERE id = ?";
const [result] = await db.execute(query, [ data.firstname, data.lastname, data.email, data.password, data.festival_id, id]);
return result as UserType[];
};
//--------------------------------------------------------------------------------

const deleted = async (id: number) => {
    const query = "DELETE FROM user WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result as UserType[];
};
//--------------------------------------------------------------------------------

    export default {
    findAll,
    findOne,
    create,
    update,
    deleted
}
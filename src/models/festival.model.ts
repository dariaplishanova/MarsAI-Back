import db from '../config/database.js';

const findAll = async () => {
    const [result] = await db.execute('SELECT * FROM festival')
    return result;
};
//--------------------------------------------------------------------------------

const findById = async (id: string) => {
    const [result] = await db.execute('SELECT * FROM festival WHERE id = ?',[id])
    return result;
};
//-------------------------------------------------------------------------------- 

const create = async (name: string, description: string, start_at: string, end_at: string, status: string, booking_total: number) => {
    const query = 'INSERT INTO festival (name, description, created_at, start_at, end_at, status, booking_total) VALUES (?, ?, NOW(), ?, ?, ?,? )';
    const [result] = await db.execute(query, [name, description, start_at, end_at, status, booking_total]);
    return result;
};
//--------------------------------------------------------------------------------

const update = async (id: string, data: { name: string, description: string, start_at: string, end_at: string, status: string, booking_total: number }) => {
    const query = `UPDATE festival SET name = ?, description = ?, start_at = ?, end_at = ?, status = ?, booking_total = ? WHERE id = ?`;
    const [result] = await db.execute(query, [data.name, data.description, data.start_at, data.end_at, data.status, data.booking_total, id]);
    return result;
};
//--------------------------------------------------------------------------------

const deleted = async (id: string) => {
    const [result] = await db.execute(`DELETE FROM festival WHERE id = ?`,[id])
    return result;
};
//--------------------------------------------------------------------------------  

export default {
    findAll,
    findById,
    create,
    update,
    deleted

};

import db from '../config/database.js';
import { ResultSetHeader } from "mysql2";

const findAll = async () => {
    const [result] = await db.execute(
        'SELECT * FROM festival'
    )
    console.log("Information :", result)
    return result;
}



const findById = async (id: string) => {
    const [result] = await db.execute(
        'SELECT * FROM festival WHERE id = ?',
        [id]
        )
console.log("Information :", result)
    return result;
}

const create = async (name: string, description: string, start_at: string, end_at: string, status: string, booking_total: number) => {
        const [result] = await db.execute(
        'INSERT INTO festival (name, description, created_at, start_at, end_at, status, booking_total) VALUES (?, ?, NOW(), ?, ?, ?,? )',
        [name, description , start_at, end_at, status, booking_total]
    )

    return result as ResultSetHeader;
}

const update = async (id: string, data: { name: string, description: string, start_at: string, end_at: string, status: string, booking_total: number }) => {
    const [result] = await db.execute(
        `UPDATE festival SET name = ?, description = ?, start_at = ?, end_at = ?, status = ?, booking_total = ? WHERE id = ?`,
        [data.name, data.description, data.start_at, data.end_at, data.status, data.booking_total, id]
    )

    return result as ResultSetHeader;
}

const deleted = async (id: string) => {
    const [result] = await db.execute(
        `DELETE FROM festival WHERE id = ?`,
        [id]
    )
    return result as ResultSetHeader;
}
    

export default {
    findAll,
    findById,
    create,
    update,
    deleted
    
};
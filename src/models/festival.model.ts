import db from '../config/database.js';



// Requete SQL pour faire une recherche de tout les festivals
const findAll = async () => {
    const [result] = await db.execute(
        'SELECT * FROM festival'
    )
    
    return result;
}

//--------------------------------------------------------------------------------
// Requete SQL pour faire une recherche d'un festival par son id

const findById = async (id: string) => {
    const [result] = await db.execute(
        'SELECT * FROM festival WHERE id = ?',
        [id]
    )
    
    return result;
}

//-------------------------------------------------------------------------------- 
// Requete SQL pour créer un nouveau festival

const create = async (name: string, description: string, start_at: string, end_at: string, status: string, booking_total: number) => {
    const sql = 'INSERT INTO festival (name, description, created_at, start_at, end_at, status, booking_total) VALUES (?, ?, NOW(), ?, ?, ?,? )';
    const [result] = await db.execute(sql, [name, description , start_at, end_at, status, booking_total]);

    return result;
}
//--------------------------------------------------------------------------------

// Requete SQL pour mettre à jour un festival existant
const update = async (id: string, data: { name: string, description: string, start_at: string, end_at: string, status: string, booking_total: number }) => {
    const query = `UPDATE festival SET name = ?, description = ?, start_at = ?, end_at = ?, status = ?, booking_total = ? WHERE id = ?`;
    
    const [result] = await db.execute(
        query,
        [data.name, data.description, data.start_at, data.end_at, data.status, data.booking_total, id]
    );

    return result;
}
//--------------------------------------------------------------------------------
// Requete SQL pour supprimer un festival par son id

const deleted = async (id: string) => {
    const [result] = await db.execute(
        `DELETE FROM festival WHERE id = ?`,
        [id]
    )
    
    return result;
}
//--------------------------------------------------------------------------------  


//Exportation des fonctions du model festival
export default {
    findAll,
    findById,
    create,
    update,
    deleted
    
};

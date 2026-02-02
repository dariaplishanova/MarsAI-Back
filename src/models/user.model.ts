import db from '../config/database.js';

// Requete SQL pour faire une recherche de tout les utilisateurs
const findAll = async () => {
    const query = "SELECT * FROM user";
    const  [result] = await db.execute(query)
    return result;
}
//--------------------------------------------------------------------------------

// Requete SQL pour faire une recherche d'un utilisateur par son id
const findOne = async (id: string | string[]) => {
    const query = "SELECT * FROM user WHERE id = ?";
    const  [result] = await db.execute(query, [id])
    return result;
}
//--------------------------------------------------------------------------------

// Requete SQL pour créer un nouvel utilisateur
const create = async (firstname: string, lastname: string, email: string, password: string, festival_id: number) => {
    const query = "INSERT INTO user (firstname, lastname, email, password, created_at,updated_at, festival_id) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)";
    const [result] = await db.execute(query, [firstname, lastname, email, password, festival_id]);
    return result;
}
//--------------------------------------------------------------------------------

// Requete SQL pour mettre à jour un utilisateur existant
const update = async (id:string | string[], data: {firstname: string, lastname: string, email: string, password: string, festival_id: number}) => {
const query  = "UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?, updated_at = NOW(), festival_id = ? WHERE id = ?";
const [result] = await db.execute(query, [ data.firstname, data.lastname, data.email, data.password, data.festival_id, id]);
return result;
}
//--------------------------------------------------------------------------------

// Requete SQL pour supprimer un utilisateur par son id
const deleted = async (id: string | string[]) => {
    const query = "DELETE FROM user WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result;
}
//--------------------------------------------------------------------------------


//Exportation des fonctions du model user

    export default {
    findAll,
    findOne,
    create,
    update,
    deleted
}
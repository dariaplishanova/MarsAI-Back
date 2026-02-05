import { Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { Params, UserType } from "../types/type.js";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const results = await UserModel.findAll();
        if (results.length > 0) {
            return res.status(404).json({ success: true, data: results,'message': 'liste des Utilisateurs trouvée'});
        }
            return res.status(201).json({ success: false, message: "Aucun utilisateur dans la base de donnée"});
    }   catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs : ", error)
            return res.status(500).json({ success: false, message: "Une erreur interne est survenue sur le serveur.", error})
    }
}
//--------------------------------------------------------------------------------

const getOneUser = async (req: Request<Params>, res: Response) => {
    try {
        const id = req.params.id;
        const results = await UserModel.findOne(id);

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Cet utilisateur est introuvable"})
        }
            return res.status(200).json({ success: true, data: results, 'message':'Utilisateur trouvé'});
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs : ", error)
        return res.status(500).json({ success: false, message: "Une erreur interne est survenue sur le serveur."});
    }
}
//--------------------------------------------------------------------------------

const createUser = async (req: Request, res: Response) => { 
    try {
    const user: UserType = req.body
    const results = await UserModel.create(user);
    if (!results) {
        return res.status(400).json({ success: false, message: 'Erreur inscription Utilisateur'})
    }
        return res.status(201).json({success: true, data: results, message: 'Utilisateur créer avec succès'
    })
}catch(error){
        return res.status(500).json({success: false, message: 'Erreur SERVEUR', error})
}
}
//--------------------------------------------------------------------------------
  const updateUser = async (req: Request<Params>, res: Response) => {
    const id  = req.params.id;
    const user: UserType = req.body;
    const results = await UserModel.update( id, user);
    try {
        if (!id || !user) {
            return res.status(400).json({ success: false, message: "Données manquantes : l'ID, le nom, le prénom et l'email sont obligatoires."});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            return res.status(400).json({ success: false, message: "Format d'email invalide." });
    }   
            return res.status(201).json({ success: true, data: results, message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
        return res.status(500).json({ success: false, message: 'Erreur SERVEUR', error });
    }
}
//--------------------------------------------------------------------------------

const deleteUser = async (req: Request<Params>, res: Response) => {
    try {
        const  id  = req.params.id;
        const results = await UserModel.deleted(id);
        return res.status(200).json({ success: true, data: results, message: 'User supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur : ", error);
        return res.status(500).json({ success: false, message: 'Une erreur interne est survenue sur le serveur.' });
    }
}   
//--------------------------------------------------------------------------------

export default {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
    
}


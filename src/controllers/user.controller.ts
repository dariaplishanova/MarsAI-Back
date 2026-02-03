import { Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { User } from "../types/type.js";

const getAllUsers = async (req: Request, res: Response) => {

    try {
        const results = await UserModel.findAll() as User[];

        if (results.length > 0) {
            return res.status(201).json({
                success: true,
                data: results,
            });
        }

        return res.status(404).json({
            success: false,
            message: "Aucun utilisateur dans la base de donnée"
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs : ", error)

        return res.status(500).json({
            success: false,
            message: "Une erreur interne est survenue sur le serveur."
        })
    }

}
//--------------------------------------------------------------------------------

const getOneUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const results = await UserModel.findOne(id) as User[];

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cet utilisateur est introuvable"
            })
        }
            return res.status(200).json({
                success: true,
                data: results,
            });

    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs : ", error)

        return res.status(500).json({
            success: false,
            message: "Une erreur interne est survenue sur le serveur."
        });
    }
}
//--------------------------------------------------------------------------------

const createUser = async (req: Request, res: Response) => { 
    const results = await UserModel.create(req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.festival_id);
    return res.status(201).json({success: true, data: results, message: 'User créer avec succès'
    });
}

  const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstname, lastname, email, password, festival_id } = req.body;

    if (!id || !firstname || !lastname || !email) {
      return res.status(400).json({ 
          success: false, 
          message: "Données manquantes : l'ID, le nom, le prénom et l'email sont obligatoires." 
      });
    }
//--------------------------------------------------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Format d'email invalide." });
    }

    try {
        const results = await UserModel.update( id, {firstname, lastname, email, password, festival_id});
        return res.status(200).json({ success: true, data: results, message: 'User mis à jour avec succès' });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
        return res.status(500).json({ success: false, message: 'Une erreur interne est survenue sur le serveur.' });
    }
}
//--------------------------------------------------------------------------------

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
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


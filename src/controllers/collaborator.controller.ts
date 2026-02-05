import { Request, Response } from "express";
import CollaboratorModel from "../models/collaborator.model.js";
import { CollaboratorType } from "../types/type.js";
import { Params } from "../types/type.js";
 


const getAllCollaborators = async (req: Request, res: Response) => {
    try{
    const results = await CollaboratorModel.findAll();
    if (results.length === 0) {
        return res.status(404).json({ 'success': false, 'message': 'Collaborateur introuvable'})
    } 
    return res.status(200).json({success: true, data: results});
}catch(error){
    return res.status(500).json({'succes': false, 'message': 'Erreur SERVEUR', error})
}
}
//--------------------------------------------------------------------------------

const getOneCollaborator = async (req: Request<Params>, res: Response) => {
   try {
    const id = req.params.id;
    const results = await CollaboratorModel.findOne(id);
        if (results.length === 0) {
          res.status(404).json({'success': false, 'message': 'Collaborateur introuvable'})  
        }
    return res.status(200).json({success: true, data: results, message: 'Collaborateur trouvé'});
   }catch (error) {
    return res.status(500).json({'success': false, 'message': 'Erreur SERVEUR', error})
   }
}
//--------------------------------------------------------------------------------

const createCollaborator = async (req: Request, res: Response) => {
    try {
    const collaborator: CollaboratorType = req.body
    const results = await CollaboratorModel.create(collaborator);
    if (!results) {
        return res.status(404).json({'success': false, 'message': 'Impossible de créer un Collaborateur'})
    }
    return res.status(201).json({success: true, data: results, message: 'Collaborateurr créer avec succès'});
} catch (error) {
res.status(500).json({ message: 'Erreur SERVEUR', error });
    }
}
//--------------------------------------------------------------------------------

const  updateCollaborator = async (req: Request<Params>, res: Response) => {
    try {
    const id = req.params.id;
    const collaborator: CollaboratorType = req.body;
     const results = await CollaboratorModel.update(id, collaborator)
     if (!results) {
        return res.status(404).json({'success': false, 'message': 'Erreur lors de la mise à jour du Collaborateur'})
     }
    return res.status(201).json({ message: 'Collaborateur mis à jour avec succès' });
} catch (error) {
    res.status(500).json({ message: 'Erreur SERVEUR', error });
}
}
//--------------------------------------------------------------------------------

const deleteCollaborator = async (req: Request<Params>, res: Response) => {
    try {
        const deletedCollaborator = await CollaboratorModel.deleted(req.params.id);
        if (!deletedCollaborator) {
            return res.status(404).json({ message: 'Collaborateurr non trouvé' });
        }
        res.status(200).json({ message: 'Collaborateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du Collaborateur', error });
    }
};
//--------------------------------------------------------------------------------
export default {
    getAllCollaborators,
    getOneCollaborator, 
    createCollaborator,
    updateCollaborator,
    deleteCollaborator

};
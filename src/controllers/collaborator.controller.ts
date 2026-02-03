import { Request, Response } from "express";
import CollaboratorModel from "../models/collaborator.model.js";
import { Collaborator } from "../types/type.js";
import { Params } from "../types/type.js";
 
const getAllCollaborators = async (req: Request, res: Response) => {
    const results = await CollaboratorModel.findAll() as Collaborator[]; 
    return res.status(201).json({success: true, data: results});
}
//--------------------------------------------------------------------------------

const getOneCollaborator = async (req: Request, res: Response) => {
    const id = req.params.id;
    const results = await CollaboratorModel.findOne(id) as Collaborator[];
    return res.status(201).json({success: true, data: results});

}
//--------------------------------------------------------------------------------

const createCollaborator = async (req: Request, res: Response) => {
    const results = await CollaboratorModel.create(
        req.body.firstname,req.body.lastname,req.body.gender,req.body.email,req.body.job,req.body.movie_id
    );
    return res.status(201).json({success: true, data: results, message: 'Collaborator créer avec succès'});
}
//--------------------------------------------------------------------------------

const  updateCollaborator = async (req: Request, res: Response) => {
    try {
    const id = req.params.id;
    const { firstname, lastname, gender, email, job, movie_id } = req.body;
    
    if (!firstname || !lastname || !gender || !email || !job || !movie_id) {
        return res.status(400).json({ message: "Champs manquants" });
    }
    const results = await CollaboratorModel.update(
        id, { firstname, lastname, gender, email, job, movie_id }
    );
    if (!results) {
        return res.status(404).json({ message: 'Collaborator non trouvé' });
    }
    res.status(200).json({ message: 'Collaborator mis à jour avec succès' });
} catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du collaborateur', error });
}
}
//--------------------------------------------------------------------------------

const deleteCollaborator = async (req: Request<Params>, res: Response) => {
    try {
        const deletedCollaborator = await CollaboratorModel.deleted(req.params.id);
        if (!deletedCollaborator) {
            return res.status(404).json({ message: 'Collaborator non trouvé' });
        }
        res.status(200).json({ message: 'Collaborator supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du collaborateur', error });
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
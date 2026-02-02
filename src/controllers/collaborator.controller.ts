import { Request, Response } from "express";
import CollaboratorModel from "../models/collaborator.model.js";


export interface Collaborator {
    "id": number,
    "firstname": string,
    "lastname": string,
    "email": string,
    "role": string,
    "movie_id": number
}

interface Params {
    id: string;
}   

const getAllCollaborators = async (req: Request, res: Response) => {
    const results = await CollaboratorModel.findAll();
    return res.json({success: true, data: results});
}
    
const getOneCollaborator = async (req: Request, res: Response) => {
    const id = req.params.id;
    const results = await CollaboratorModel.findOne(id);
  
    return res.json({success: true, data: results});

}


const createCollaborator = async (req: Request, res: Response) => {
    const results = await CollaboratorModel.create(
        req.body.firstname,req.body.lastname,req.body.gender,req.body.email,req.body.job,req.body.movie_id
    );return res.json({
        success: true, data: results, message: 'Collaborator created successfully'
    });
}

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
        return res.status(404).json({ message: 'Collaborator not found' });
    }
    res.status(200).json({ message: 'Collaborator updated successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error updating collaborator', error });
}
}

const deleteCollaborator = async (req: Request<Params>, res: Response) => {
    try {
        const deletedCollaborator = await CollaboratorModel.deleted(req.params.id);
        if (!deletedCollaborator) {
            return res.status(404).json({ message: 'Collaborator not found' });
        }
        res.status(200).json({ message: 'Collaborator deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collaborator', error });
    }
};


export default {
    getAllCollaborators,
    getOneCollaborator, 
    createCollaborator,
    updateCollaborator,
    deleteCollaborator

};
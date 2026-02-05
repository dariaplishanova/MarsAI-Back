import { Request, Response } from 'express';
import FestivalModel from '../models/festival.model.js';
import { FestivalType, Params } from '../types/type.js';


const getAllFestivals = async (req: Request, res: Response) => {
  try { 
    const results = await FestivalModel.findAll();
    if (results.length === 0) {
        return res.status(404).json({ success: false, message: "Aucun festival dans la base de donnée"});
    }
    return res.status(200).json({success: true, data: results});
  } catch (error) {
    console.error("Erreur lors de la récupération des festivaux : ", error)
    return res.status(500).json({ success: false, message: "Une erreur interne est survenue sur le serveur."})
  }
  };
//--------------------------------------------------------------------------------

const getFestivalById = async (req: Request<Params>, res: Response) => {
    try {
        const id = req.params.id
        const festival = await FestivalModel.findById(id);
        if (festival.length === 0) {
          return res.status(404).json({ message: 'Aucun festival trouvé' });
        } 
        res.status(200).json(festival);
  } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du festival', error });
  }
}
//--------------------------------------------------------------------------------

const createFestival = async (req: Request, res: Response) => {
 try {
        const festival: FestivalType = req.body
        const results = await FestivalModel.create(festival);
        if (!results) {
          return res.status(400).json({ success: false, 'message': 'Erreur lors de la création du Festival'})
        }
        return res.status(201).json({success: true, data: results, message: 'Festival créé avec succès'});
  }catch(error) {
    return res.status(500).json({ success: false, message: 'Erreur lors de la création du réalisateur'})
  }
};
//--------------------------------------------------------------------------------
  
const updateFestival = async (req: Request<Params>, res: Response) => {
  try {
    const id  = req.params.id;
    const festival: FestivalType = req.body;
    const results = await FestivalModel.update(id, festival)
    if (!results) {
      return res.status(404).json({ message: 'Festival non trouvé' });
    }
    res.status(201).json({ message: 'Festival mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du festival', error });
  }
};
//--------------------------------------------------------------------------------

const deleteFestival = async (req: Request<Params>, res: Response) => {
  try {
    const id = req.params.id
    const deletedFestival = await FestivalModel.deleted(id);
    if (!deletedFestival) {
      return res.status(404).json({ message: 'Festival non trouvé' });
    }
    res.status(200).json({ message: 'Festival supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du festival', error });
  }
};
//--------------------------------------------------------------------------------
export default {
  getAllFestivals,
  getFestivalById,
  createFestival,
  updateFestival,
  deleteFestival
}
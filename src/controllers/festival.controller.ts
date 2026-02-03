import { Request, Response } from 'express';
import FestivalModel from '../models/festival.model.js';
import { Festival } from '../types/type.js';
import { Params } from '../types/type.js';

const getAllFestivals = async (req: Request, res: Response) => {

  try { 
    const results = await FestivalModel.findAll() as Festival[];
    
    if (results.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Aucun festival dans la base de donnée"
        });
    }
    return res.status(200).json({
        success: true,
        data: results,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des festivaux : ", error)

    return res.status(500).json({
        success: false,
        message: "Une erreur interne est survenue sur le serveur."
    })
  }
};
//--------------------------------------------------------------------------------

const getFestivalById = async (req: Request<Params>, res: Response) => {
    try {
        const festival = await FestivalModel.findById(req.params.id) as Festival[];
  
        if ((Array.isArray(festival) && festival.length === 0)) {
          return res.status(404).json({ message: 'Aucun festival trouvé' });
        }
            
        res.status(200).json(festival);
  } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du festival', error });
  }
}
//--------------------------------------------------------------------------------

const createFestival = async (req: Request, res: Response) => {
    const results = await FestivalModel.create(req.body.name, req.body.description, req.body.start_at, req.body.end_at, req.body.status, req.body.booking_total);
    
    if (!req.body.name || !req.body.description || !req.body.start_at || !req.body.end_at || !req.body.status) {
        return res.status(400).json({ message: "Champs manquants" });   
    }else {
        const results = await FestivalModel.create(
            req.body.name, req.body.description, req.body.start_at, req.body.end_at, req.body.status, req.body.booking_total
        );
        return res.status(201).json({
            success: true,
            data: results,
            message: 'Festival créé avec succès'
        });
    }
  } 
//--------------------------------------------------------------------------------
  
const updateFestival = async (req: Request<Params>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, start_at, end_at, status, booking_total } = req.body;
  
    if (!name || !description || !start_at || !end_at || !status) {
      return res.status(400).json({ message: "Champs manquants" });
    }
    const results = await FestivalModel.update(
     id, {name, description, start_at, end_at, status, booking_total}
    );
    if (!results) {
      return res.status(404).json({ message: 'Festival non trouvé' });
    }
    res.status(200).json({ message: 'Festival mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du festival', error });
  }
};
//--------------------------------------------------------------------------------

const deleteFestival = async (req: Request<Params>, res: Response) => {
  try {
    const deletedFestival = await FestivalModel.deleted(req.params.id);
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
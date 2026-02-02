import { Request, Response } from 'express';
import FestivalModel from '../models/festival.model.js';

export interface Festival {
  id: number;
  name: string;
  decription: string;
  created_at: Date | string;
  start_at: Date | string;
  end_at: Date | string;
  status: 'Actif' | 'Inactif';
  booking_total: number;
}
interface Params {
  id: string;
} 

const getAllFestivals = async (req: Request, res: Response) => {
  try { 
    const results = await FestivalModel.findAll() as Festival[];
    
    if (results.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Aucun festival dans la base de donnée"
        });
    }

    return res.status(200).json({
        success: true,
        data: results,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des festivaux : ", error)

    return res.json({
        success: false,
        message: "Une erreur interne est survenue sur le serveur."
    })
  }
};

const getFestivalById = async (req: Request<Params>, res: Response) => {
    try {
        const festival = await FestivalModel.findById(req.params.id) as Festival[];
  
        if ((Array.isArray(festival) && festival.length === 0)) {
          return res.status(404).json({ message: 'Festival not found' });
        }
            
        res.status(200).json(festival);
  } catch (error) {
        res.status(500).json({ message: 'Error retrieving festival', error });
  }
}


const createFestival = async (req: Request, res: Response) => {
    const results = await FestivalModel.create(req.body.name, req.body.description, req.body.start_at, req.body.end_at, req.body.status, req.body.booking_total);
    return res.json({success: true, data: results, message: 'Festival created successfully'
    });
  } 
  
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
      return res.status(404).json({ message: 'Festival not found' });
    }
    res.status(200).json({ message: 'Festival updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating festival', error });
  }
};

const deleteFestival = async (req: Request<Params>, res: Response) => {
  try {
    const deletedFestival = await FestivalModel.deleted(req.params.id);
    if (!deletedFestival) {
      return res.status(404).json({ message: 'Festival not found' });
    }
    res.status(200).json({ message: 'Festival deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting festival', error });
  }
}; 

export default {
  getAllFestivals,
  getFestivalById,
  createFestival,
  updateFestival,
  deleteFestival
}
import { Request, RequestHandler, Response } from 'express';
import festivalModel from '../models/festival.model.js';


type Params = {
  id: string; 
};



const getAllFestivals = async (req: Request, res: Response) => {
  const results = await festivalModel.findAll();
  return res.json({success: true, data: results});
};


const createFestival = async (req: Request, res: Response) => {
    const results = await festivalModel.create(req.body.name, req.body.description, req.body.start_at, req.body.end_at, req.body.status, req.body.booking_total);
    return res.json({success: true, data: results, message: 'Festival created successfully'
    });
  } 
   
  


const getFestivalById = async (req: Request<Params>, res: Response) => {

    const festival = await festivalModel.findById(req.params.id);
    if ((Array.isArray(festival) && festival.length === 0)) {
      return res.status(404).json({ message: 'Festival not found' });
    }
    res.status(200).json(festival);
  } 
  

const updateFestival = async (req: Request<Params>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, start_at, end_at, status, booking_total } = req.body;
  
    if (!name || !description || !start_at || !end_at || !status) {
      return res.status(400).json({ message: "Champs manquants" });
    }
    const results = await festivalModel.update(
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
    const deletedFestival = await festivalModel.deleted(req.params.id);
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
};

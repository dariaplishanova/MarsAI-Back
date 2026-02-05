import { Request, Response } from 'express';
import MovieModel from '../models/movie.model.js';
import { MovieType } from '../types/type.js';


const getAllMovies = async (req: Request, res: Response) => {
  
  try {
    const results =  await MovieModel.findAll();
    if (results.length === 0) {
      res.status(404).json({success: false, message: "Aucune video n'a ete trouve."});
    }
      res.status(201).json({success: true, data: results, 'message': 'Liste des films trouvé'});
  } catch(error) {
    res.status(500).json({success: false, message: "Erreur SERVEUR", error})
  }
}
//--------------------------------------------------------------------------------

export default { 
  getAllMovies,  

}
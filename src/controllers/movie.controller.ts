import { Request, Response } from 'express';
import MovieModel from '../models/movie.model.js';
import { MovieType } from '../types/type.js';


const getAllMovies = async (req: Request, res: Response) => {
  
  try {
    const results =  await MovieModel.findAll() as MovieType[];

    if (results.length === 0) {
        res.status(404).json({
          success: false,
          message: "Aucune video n'a ete trouve." 
        });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  }  catch {
    res.status(500).json({
      success: false,
      message: "Erreur interne survenue sur le serveur."
    })
  }
}
//--------------------------------------------------------------------------------


export default { 
  getAllMovies,  

}
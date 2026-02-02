import { Request, Response } from 'express';
import movieModel from '../models/movie.model';
import { MovieType } from '../types/movie.type';

const getAllMovies = async (req: Request, res: Response) => {
  
  try {
    const results =  await movieModel.findAll() as MovieType[];

    if (results.length === 0) {
        res.status(200).json({
          success: true,
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

export default { 
  getAllMovies,  

}
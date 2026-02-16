import { Request, Response } from 'express';
import movieModel from '../models/movie.model.js';

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const results = await movieModel.findAll();
    if (results.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Aucune video n'a ete trouve." });
    }
    res.status(201).json({
      success: true,
      data: results,
      message: 'Liste des films trouvé',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur SERVEUR', error });
  }
};
//--------------------------------------------------------------------------------

export default {
  getAllMovies,
};

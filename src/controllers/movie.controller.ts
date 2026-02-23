import { Response } from 'express';
import Movie from '../models/movie.model.js';
import { Params, RequestEmpty, RequestParams } from '../types/type.js';
import logger from '../config/logger.js';
import { sendError } from '../utils.js';

const getAllMovies = async (_req: RequestEmpty, res: Response) => {
  const results = await Movie.findAll();

  if (results.length === 0) {
    logger.warn(`Aucune vidéo n'a été trouvé.`);
    return res.status(200).json({
      success: true,
      data: [],
      message: "Aucune vidéo n'a été trouvé",
    });
  }

  logger.info(`${results.length} vidéos ont été trouvées`);
  res.status(200).json({
    success: true,
    data: results,
    message: 'Liste des films trouvé',
  });
};

const getMovieById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return sendError("Ce film est introuvable.", 400, "error");
  }

  const movie = await Movie.findById(id);

  if (!movie) {
    return sendError(`Le film ${id} est introuvable`, 404, "error");
  }

  logger.info(`Film : ${movie?.title} trouvé.`);
  return res.status(200).json({
    success: true,
    data: [movie]
  })

}

export default {
  getAllMovies,
  getMovieById
};

import { Response } from 'express';
import Movie from '../models/movie.model.js';
import { MovieType, Params, RequestBody, RequestEmpty, RequestParams, RequestParamsBody } from '../types/type.js';
import logger from '../config/logger.js';
import { s, sendError } from '../utils.js';

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

  logger.info(`${results.length} vidéo${s(results.length)} ont été trouvées`);
  res.status(200).json({
    success: true,
    data: results,
    message: `${results.length} vidéo${s(results.length)} ont été trouvées`,
  });
};

const getMovieById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);

  const movie = await Movie.findById(numericId);

  if (!movie) {
    return sendError(`Le film d'id ${id} est introuvable`, 404);
  }

  logger.info(`Film : ${movie?.title} trouvé.`);
  return res.status(200).json({
    success: true,
    data: [movie],
  });
};

const create = async (req: RequestBody<MovieType>, res: Response) => {
  const results = await Movie.create(req.body);

  if (results.affectedRows === 0) {
    return sendError('Erreur lors de la création du Film', 500);
  }

  logger.info(`Le film a été créé avec succès.`);
  return res.status(201).json({
    success: true,
    data: results,
    message: 'Festival créé avec succès',
  });
};

const update = async (req: RequestParamsBody<Params, Partial<MovieType>>, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);
  const results = await Movie.update(numericId, req.body);

  if (results.affectedRows === 0) {
    const exists = await Movie.findById(numericId);

    if (!exists) {
      logger.warn(`Tentative de modification d'un film inexistant (ID: ${numericId})`);
      return sendError("Le film n'a pas été trouvé.", 404);
    }

    return res.status(200).json({
      success: true,
      message: 'Aucun changement nécessaire (données identiques)',
    });
  }

  logger.info(`Le film a été modifié.`);
  res.status(200).json({
    success: true,
    message: 'Film mis à jour avec succès',
  });
};

export default {
  getAllMovies,
  getMovieById,
  create,
  update,
};

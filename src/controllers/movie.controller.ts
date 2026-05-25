import { Response } from 'express';
import * as MovieService from '../services/movie.service.js';
import logger from '../config/logger.js';
import { MovieType, Params, RequestBody, RequestEmpty, RequestParams, RequestParamsBody } from '../types/type.js';
import { s } from '../utils.js';
import AppError from '../errors/AppError.js';

export const getAllMovies = async (_req: RequestEmpty, res: Response) => {
  const results = await MovieService.getAllMovies();

  if (results.length === 0) {
    logger.warn('No videos found.');
  } else {
    logger.info(`${results.length} video${s(results.length)} found.`);
  }

  return res.json({
    success: true,
    data: results,
    message:
      results.length === 0
        ? "Aucune vidéo n'a été trouvé"
        : `${results.length} vidéo${s(results.length)} ont été trouvées`,
  });
};

export const getAllMoviesForJury = async (_req: RequestEmpty, res: Response) => {
  const results = await MovieService.getAllMoviesForJury();

  if (results.length === 0) {
    logger.warn('No videos found for the jury.');
  } else {
    logger.info(`${results.length} video${s(results.length)} found for the jury.`);
  }

  return res.json({
    success: true,
    data: results,
    message:
      results.length === 0
        ? "Aucune vidéo n'a été trouvé"
        : `${results.length} vidéo${s(results.length)} ont été trouvées pour le jury`,
  });
};

export const getAllMoviesForAdmin = async (_req: RequestEmpty, res: Response) => {
  const results = await MovieService.getAllMoviesForAdmin();

  if (results.length === 0) {
    logger.warn('No videos found for the admin.');
  } else {
    logger.info(`${results.length} video${s(results.length)} found for the admin.`);
  }

  return res.json({
    success: true,
    data: results,
    message:
      results.length === 0
        ? "Aucune vidéo n'a été trouvé"
        : `${results.length} vidéo${s(results.length)} ont été trouvées pour l'admin`,
  });
};

export const getMovieById = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const movie = await MovieService.getMovieById(Number(id));

  logger.info(`Movie: "${movie.title}" found successfully.`);
  return res.json({
    success: true,
    data: [movie],
  });
};

export const create = async (req: RequestBody<MovieType>, res: Response) => {
  const results = await MovieService.create(req.body);

  logger.info('Movie entry created successfully.');
  return res.status(201).json({
    success: true,
    data: results,
    message: 'Festival créé avec succès',
  });
};

export const update = async (req: RequestParamsBody<Params, Partial<MovieType>>, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  logger.info(`[Movie Controller]: Received PUT request for Movie ID ${id}`);

  if (!status) {
    logger.warn(`[Movie Controller Warning]: Request rejected. Missing "status" in request body.`);
    throw new AppError('Invalid or missing payload parameters.', 400);
  }

  const updatedMovie = await MovieService.changeMovieStatus(Number(id), status);

  logger.info(`[Movie Controller]: Sending successful response back to admin dashboard.`);
  return res.json({
    success: true,
    message: 'Movie status updated successfully.',
    data: updatedMovie,
  });
};

export default {
  getAllMovies,
  getAllMoviesForJury,
  getAllMoviesForAdmin,
  getMovieById,
  create,
  update,
};

import AppError from '../errors/AppError.js';
import { MovieType } from '../types/type.js';
import Movie from '../models/movie.model.js';
import { ResultSetHeader } from 'mysql2';

export const getAllMovies = async (): Promise<MovieType[]> => {
  return await Movie.findAll();
};

export const getAllMoviesForJury = async (): Promise<MovieType[]> => {
  return await Movie.findAllForJury();
};

export const getAllMoviesForAdmin = async (): Promise<MovieType[]> => {
  return await Movie.findAllForAdmin();
};

export const getMovieById = async (id: number): Promise<MovieType> => {
  const movie = await Movie.findById(id);

  if (!movie) {
    throw new AppError(`Movie with ID ${id} not found`, 404);
  }

  return movie;
};

export const create = async (movieData: MovieType): Promise<ResultSetHeader> => {
  const results = await Movie.create(movieData);

  if (results.affectedRows === 0) {
    throw new AppError('Error occurred while creating the movie', 500);
  }

  return results as ResultSetHeader;
};

export const changeMovieStatus = async (id: number, status: string): Promise<MovieType> => {
  const existingMovie = await Movie.findById(id);

  if (!existingMovie) {
    throw new AppError('Movie not found', 404);
  }

  await Movie.updateStatus(id, status);
  const updatedMovie = await Movie.findById(id);

  if (!updatedMovie) {
    throw new AppError('The request could not be completed', 400);
  }

  return updatedMovie;
};

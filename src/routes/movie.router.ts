import express from 'express';
import MovieController from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/', MovieController.getAllMovies);
router.get('/:id', MovieController.getMovieById);

export default router;

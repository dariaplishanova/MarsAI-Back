import express from 'express';
import MovieController from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/', MovieController.getAllMovies);

export default router;

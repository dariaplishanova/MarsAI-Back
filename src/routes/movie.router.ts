import express from 'express';
import MovieController from '../controllers/movie.controller.js';

const router = express.Router();

//Route pour récupérer tous les films
router.get('/', MovieController.getAllMovies);
//Route pour récupérer un film par son id
// router.get('/:id', movieController.getMovieById);
// //Route pour la création d'un nouveau film
// router.post('/', movieController.createMovie);
// //Route pour la mise à jour d'un film
// router.put('/:id', movieController.updateMovie);
// //Route pour la suppression d'un film
// router.delete('/:id', movieController.deleteMovie);

export default router;

import express from 'express';
import DirectorController from '../controllers/director.controller.js';

const router = express.Router();

//Route pour récupérer tous les collaborateurs
router.get('/', DirectorController.getAllDirectors);
//Route pour récupérer un réalisateur avec son ID
router.get('/:id', DirectorController.getDirectorById);
//Route pour créer un réalisateur
router.post('/', DirectorController.createDirector);

export default router;

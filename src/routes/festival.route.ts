import express from 'express';
import FestivalController from '../controllers/festival.controller.js';

const router = express.Router();

//Route pour récupérer tous les festivals
router.get('/', FestivalController.getAllFestivals);
//Route pour récupérer un festival par son id
router.get('/:id', FestivalController.getFestivalById);
//Route pour la création d'un nouveau festival
router.post('/', FestivalController.createFestival);
//Route pour la mise à jour d'un festival
router.put('/:id', FestivalController.updateFestival);
//Route pour la suppression d'un festival
router.delete('/:id', FestivalController.deleteFestival);

export default router;

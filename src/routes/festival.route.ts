import express from 'express';
import festivalController from "../controllers/festival.controller.js";

const router = express.Router();
//Route pour récupérer tous les festivals
router.get('/', festivalController.getAllFestivals);
//Route pour récupérer un festival par son id
router.get('/:id', festivalController.getFestivalById);
//Route pour la création d'un nouveau festival
router.post('/', festivalController.createFestival);
//Route pour la mise à jour d'un festival   
router.put('/:id', festivalController.updateFestival);
//Route pour la suppression d'un festival
router.delete('/:id', festivalController.deleteFestival);   

export default router
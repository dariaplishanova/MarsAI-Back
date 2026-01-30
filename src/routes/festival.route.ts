import express from 'express';
import festivalController from "../controllers/festival.controller.js";

const router = express.Router();

router.get('/', festivalController.getAllFestivals);
router.get('/:id', festivalController.getFestivalById);
router.post('/', festivalController.createFestival);   
router.put('/:id', festivalController.updateFestival);
router.delete('/:id', festivalController.deleteFestival);   



export default router
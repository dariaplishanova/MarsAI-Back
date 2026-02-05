import express from 'express'
import DirectorController from '../controllers/director.controller.js';

const router = express.Router();

router.get('/',DirectorController.getAllDirectors);
router.get('/:id',DirectorController.getAllDirectors);
router.post('/',DirectorController.createDirector);

export default router

import express from 'express';
import DirectorController from '../controllers/director.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { directorSchema } from '../validation/director.schema.js';
import { idParamSchema } from '../validation/idParams.schema.js';

const router = express.Router();

router.get('/', DirectorController.getAllDirectors);
router.get('/:id', validate(idParamSchema, 'params'), DirectorController.getDirectorById);
router.post('/', validate(directorSchema), DirectorController.createDirector);

export default router;

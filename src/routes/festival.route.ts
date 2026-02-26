import express from 'express';
import FestivalController from '../controllers/festival.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { festivalSchema } from '../validation/festival.schema.js';
import { idParamSchema } from '../validation/idParams.schema.js';

const router = express.Router();

router.get('/', FestivalController.getAllFestivals);
router.get('/:id', validate(idParamSchema, 'params'), FestivalController.getFestivalById);
router.post('/', validate(festivalSchema), FestivalController.createFestival);
router.put(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(festivalSchema.partial()),
  FestivalController.updateFestival,
);
router.delete('/:id', validate(idParamSchema, 'params'), FestivalController.deleteFestival);

export default router;

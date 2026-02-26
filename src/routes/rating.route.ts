import express from 'express';
import RatingController from '../controllers/rating.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { ratingSchema } from '../validation/rating.schema.js';

const router = express.Router();

router.post('/', validate(ratingSchema), RatingController.createRating);

export default router;

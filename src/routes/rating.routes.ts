import express from 'express';
import RatingController from '../controllers/rating.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { ratingSchema } from '../validation/rating.schema.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';

const router = express.Router();

router.post('/', verifyToken, checkRole('jury'), validate(ratingSchema), RatingController.createRating);

export default router;
import dotenv from 'dotenv';
import express from 'express';
import authController from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

dotenv.config();
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', verifyToken, authController.getProfile);

export default router;

import dotenv from 'dotenv';
import express from 'express';
import authController from '../controllers/auth.controller.js';

dotenv.config();
const router = express.Router();
const login = authController;
const register = authController;

router.post('/login', login.login);
router.post('/register', register.register);

export default router;

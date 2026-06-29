import express from 'express';
import authController, { verifyInvite } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', verifyToken, authController.getProfile);
router.post('/invite',  verifyToken, checkRole('admin'), authController.inviteJury)
router.get('/verify-invite/:token', verifyInvite);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

export default router;

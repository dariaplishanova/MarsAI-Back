import { Response } from 'express';
import AuthModel from '../models/auth.model.js';
import { AuthenticatedRequest, LoginCredentials, RequestBody, UserType } from '../types/type.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils.js';
import logger from '../config/logger.js';
import userModel from '../models/user.model.js';

export const login = async (req: RequestBody<LoginCredentials>, res: Response) => {
  const { email, password } = req.body;

  const user = await userModel.findByEmail(email);
  if (!user) {
    return sendError('Identifiants invalides', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password!);
  if (!isMatch) {
    return sendError('Identifiants invalides', 401);
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '2h' });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    },
  });
};

const register = async (req: RequestBody<UserType>, res: Response) => {
  const { password, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password!, 10);
  const results = await AuthModel.create({ ...userData, password: hashedPassword, role: 'user' });

  if (results.affectedRows === 0) {
    return sendError("Échec inattendu côté serveur lors de l\'insertion.", 500);
  }

  const userId = results.insertId;
  logger.info(`Nouvel utilisateur créé avec l'id ${userId}.`);

  return res.status(201).json({
    success: true,
    data: { userId, ...results },
    message: 'Utilisateur créé avec succès',
  });
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  // 1. Extraction de l'ID depuis le middleware verifyToken
  const userId = req.user?.userId;

  if (!userId) {
    // Utilisation de ta fonction utilitaire
    return sendError('Utilisateur non identifié', 401);
  }

  // 2. Récupération en base de données
  // Si la DB est offline, Express 5 attrape l'erreur automatiquement
  const user = await userModel.findById(userId);

  if (!user) {
    return sendError('Profil introuvable', 404);
  }

  // 3. Réponse de succès unique
  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    },
  });
};

export default {
  login,
  register,
  getProfile,
};

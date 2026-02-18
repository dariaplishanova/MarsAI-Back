import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model.js';
import { AppError, Params, UserType } from '../types/type.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// enlever les ty/catch pour laiser Express gerer les Erreurs via le middleware erreur.middleware.ts

//--------------------------------------------------------------------------------

const getAllUsers = async (_req: Request, res: Response) => {
  const results = await UserModel.findAll();

  if (results.length === 0) {
    return res.status(200).json({
      success: false,
      data: [],
      message: 'Aucun utilisateur trouvé',
    });
  }

  return res.status(200).json({
    success: true,
    data: results,
  });
};

//--------------------------------------------------------------------------------

const getOneUser = async (req: Request<Params>, res: Response) => {
  const id = req.params.id;
  const results = await UserModel.findOne(id);

  if (!results || results.length === 0) {
    const error = new Error('Cet utilisateur est introuvable') as AppError;
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    data: results,
    message: 'Utilisateur trouvé'
  });
};

//--------------------------------------------------------------------------------

const createUser = async (req: Request<{}, {}, UserType>, res: Response) => {
  const user = req.body;

  user.hashedPassword = await bcrypt.hash(user.password, 10); // utiliser hash => asynchrone, non-bloquant
  const results = await UserModel.create(user);

  if (!results) {
    return res.status(400).json({ success: false, message: 'Erreur inscription Utilisateur' });
  }
  return res.status(201).json({
    id: user.insertId,
    success: true,
    data: results,
    message: 'Utilisateur créer avec succès',
  });
};

//--------------------------------------------------------------------------------
const updateUser = async (req: Request<Params>, res: Response) => {
  const id = req.params.id;
  const user: UserType = req.body;
  const results = await UserModel.update(id, user);
  try {
    if (!id || !user) {
      return res.status(400).json({
        success: false,
        message: "Données manquantes : l'ID, le nom, le prénom et l'email sont obligatoires.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return res.status(400).json({ success: false, message: "Format d'email invalide." });
    }
    return res.status(201).json({
      success: true,
      data: results,
      message: 'Utilisateur mis à jour avec succès',
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    return res.status(500).json({ success: false, message: 'Erreur SERVEUR', error });
  }
};
//--------------------------------------------------------------------------------

const deleteUser = async (req: Request<Params>, res: Response) => {
  try {
    const id = req.params.id;
    const results = await UserModel.deleted(id);
    return res.status(200).json({
      success: true,
      data: results,
      message: 'User supprimé avec succès',
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur : ", error);
    return res.status(500).json({
      success: false,
      message: 'Une erreur interne est survenue sur le serveur.',
    });
  }
};
//--------------------------------------------------------------------------------
const connectionUser = async (req: Request<Params>, res: Response) => {
  try {
    const { email, password } = req.body;
    const users = await UserModel.findByEmail(email);

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Cet utilisateur est introuvable' });
    }
    const user = users[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Identifiants invalides');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    return res.status(200).json({
      success: true,
      data: users,
      message: 'Connexion effectué avec succés !',
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs : ', error);
    return res.status(500).json({
      success: false,
      message: 'Une erreur interne est survenue sur le serveur.',
    });
  }
};
export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  connectionUser,
};

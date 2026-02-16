import { Request, Response } from 'express';
import AuthModel from '../models/auth.model.js';
import { Params, UserType } from '../types/type.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req: Request<Params>, res: Response) => {
  try {
    const { email, password } = req.body;
    const users = await AuthModel.findByEmail(email);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Cet utilisateur est introuvable' });
    }
    const user = users[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Identifiants invalides');
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
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
const register = async (req: Request, res: Response) => {
  try {
    const user: UserType = req.body;
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    const results = await AuthModel.create(user);

    if (!results) {
      return res
        .status(400)
        .json({ success: false, message: 'Erreur inscription Utilisateur' });
    }
    return res.status(201).json({
      id: user.insertId,
      success: true,
      data: results,
      message: 'Utilisateur créer avec succès',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Erreur SERVEUR', error });
  }
};

export default {
  login,
  register,
};

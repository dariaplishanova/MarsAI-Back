import { Response } from 'express';
import UserModel from '../models/user.model.js';
import { Params, RequestEmpty, RequestParams, RequestParamsBody, UserType } from '../types/type.js';
import { sendError } from '../utils.js';
import logger from '../config/logger.js';

const getAllUsers = async (_req: RequestEmpty, res: Response) => {
  const results = await UserModel.findAll();

  if (results.length === 0) {
    logger.warn('Aucun utilisateur présent dans la base de données');
    return res.status(200).json({
      success: false,
      data: [],
      message: 'Aucun utilisateur trouvé',
    });
  }

  logger.info(`${results.length} utilisateurs récupérés avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
  });
};

const getOneUser = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);
  const user = await UserModel.findById(numericId);

  if (!user) {
    return sendError('Cet utilisateur est introuvable.', 404);
  }

  logger.info(`L'utilisateur ${user.firstname} ${user.lastname} récupéré avec succès`);
  return res.status(200).json({
    success: true,
    data: user,
  });
};

const updateUser = async (req: RequestParamsBody<Params, Partial<UserType>>, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  const numericId = Number(id);

  const results = await UserModel.update(numericId, user);

  if (results.affectedRows === 0) {
    return sendError(`L'utilisateur ${id} néxiste pas.`);
  }

  logger.info(`Utilisateur modifié avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
    message: 'Utilisateur mis à jour avec succès',
  });
};

const deleteUser = async (req: RequestParams<Params>, res: Response) => {
  const { id } = req.params;

  const numericId = Number(id);

  const results = await UserModel.deleted(numericId);

  if (results.affectedRows === 0) {
    return sendError('Utilisateur introuvable.');
  }

  logger.info(`Utilisateurs supprimé avec succès`);
  return res.status(200).json({
    success: true,
    data: results,
    message: 'User supprimé avec succès',
  });
};

export default {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};

import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();
//Route pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);
//Route pour récupérer un utilisateur par son id
router.get('/:id', userController.getOneUser);
//Route pour la création d'un nouvel utilisateur
router.post('/', userController.createUser);
//Route pour la mise à jour d'un utilisateur
router.put('/:id', userController.updateUser);
//Route pour la suppression d'un utilisateur
router.delete('/:id', userController.deleteUser);

export default router;
import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

//Route pour récupérer tous les utilisateurs
router.get('/', UserController.getAllUsers);
//Route pour récupérer un utilisateur par son id
router.get('/:id', UserController.getOneUser);
//Route pour la création d'un nouvel utilisateur
router.post('/', UserController.createUser);
//Route pour la mise à jour d'un utilisateur
router.put('/:id', UserController.updateUser);
//Route pour la suppression d'un utilisateur
router.delete('/:id', UserController.deleteUser);

export default router;

import express from 'express';
import collaboratorController from '../controllers/collaborator.controller.js';

const router = express.Router();

//Route pour récupérer tous les collaborateurs
router.get('/', collaboratorController.getAllCollaborators);
//Route pour récupérer un collaborateur par son id
router.get('/:id', collaboratorController.getOneCollaborator);
//Route pour la création d'un nouveau collaborateur
router.post('/', collaboratorController.createCollaborator);
//Route pour la mise à jour d'un collaborateur
router.put('/:id', collaboratorController.updateCollaborator);
//Route pour la suppression d'un collaborateur
router.delete('/:id', collaboratorController.deleteCollaborator);

export default router;
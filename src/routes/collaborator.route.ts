import express from 'express';
import CollaboratorController from '../controllers/collaborator.controller.js';

const router = express.Router();

//Route pour récupérer tous les collaborateurs
router.get('/', CollaboratorController.getAllCollaborators);
//Route pour récupérer un collaborateur par son id
router.get('/:id', CollaboratorController.getOneCollaborator);
//Route pour la création d'un nouveau collaborateur
router.post('/', CollaboratorController.createCollaborator);
//Route pour la mise à jour d'un collaborateur
router.put('/:id', CollaboratorController.updateCollaborator);
//Route pour la suppression d'un collaborateur
router.delete('/:id', CollaboratorController.deleteCollaborator);

export default router;

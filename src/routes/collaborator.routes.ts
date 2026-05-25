import express from 'express';
import CollaboratorController from '../controllers/collaborator.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idParamSchema } from '../validation/idParams.schema.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';
import { collaboratorSchema } from '../validation/collaborator.schema.js';

const router = express.Router();

router.get('/', CollaboratorController.getAllCollaborators);
router.get('/:id', validate(idParamSchema, 'params'), CollaboratorController.getOneCollaborator);
router.post('/', validate(collaboratorSchema), CollaboratorController.createCollaborator);
router.put(
  '/:id',
  verifyToken,
  checkRole('admin'),
  validate(idParamSchema, 'params'),
  validate(collaboratorSchema.partial()),
  CollaboratorController.updateCollaborator,
);
router.delete(
  '/:id',
  verifyToken,
  checkRole('admin'),
  validate(idParamSchema, 'params'),
  CollaboratorController.deleteCollaborator,
);

export default router;

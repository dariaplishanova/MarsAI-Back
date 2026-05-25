import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idParamSchema } from '../validation/idParams.schema.js';
import { userSchema } from '../validation/user.schema.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';

const router = express.Router();

router.get('/', verifyToken, checkRole('admin'), UserController.getAllUsers);
router.get('/:id', verifyToken, validate(idParamSchema, 'params'), UserController.getOneUser);
router.put('/:id', verifyToken, validate(idParamSchema, 'params'), validate(userSchema.partial()), UserController.updateUser);
router.delete('/:id', verifyToken, checkRole('admin'), validate(idParamSchema, 'params'), UserController.deleteUser);

export default router;
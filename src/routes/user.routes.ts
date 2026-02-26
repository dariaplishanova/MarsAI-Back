import express from 'express';
import UserController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { idParamSchema } from '../validation/idParams.schema.js';
import { userSchema } from '../validation/user.schema.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', validate(idParamSchema, 'params'), UserController.getOneUser);
router.post('/', validate(userSchema), UserController.createUser);
router.put('/:id', validate(idParamSchema, 'params'), validate(userSchema.partial()), UserController.updateUser);
router.delete('/:id', validate(idParamSchema, 'params'), UserController.deleteUser);

export default router;

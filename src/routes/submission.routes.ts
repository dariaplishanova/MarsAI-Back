import express from 'express';
import submissionController from '../controllers/submission.controller.js';
import { uploadSubmission } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/', uploadSubmission, submissionController.createSubmission);

export default router;

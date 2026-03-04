import express from 'express';
import submissionController from '../controllers/submission.controller.js';
import { uploadSubmission } from '../middlewares/upload.middleware.js';

const router = express.Router();

// I place the Multer middleware (uploadSubmission) BEFORE the controller.
// This ensures that Express intercepts the FormData, extracts the image files into server RAM, 
// and parses the text fields BEFORE my controller ever starts running.
router.post(
  '/', 
  uploadSubmission, 
  submissionController.createSubmission
);

export default router;
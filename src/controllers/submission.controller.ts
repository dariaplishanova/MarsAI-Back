import { Response } from 'express';
import * as SubmissionService from '../services/submission.service.js';
import { RequestBody, SubmissionTextPayload, SubmissionFiles } from '../types/type.js';

export const createSubmission = async (req: RequestBody<SubmissionTextPayload>, res: Response): Promise<Response> => {
  const multerFiles = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

  const filesPayload: SubmissionFiles = {
    video: multerFiles?.video?.[0],
    thumbnail: multerFiles?.thumbnail?.[0],
    gallery: multerFiles?.gallery,
  };

  await SubmissionService.processSubmission(req.body, filesPayload);

  return res.status(201).json({
    success: true,
    message: 'Upload and submission successful!',
  });
};

export default {
  createSubmission,
};

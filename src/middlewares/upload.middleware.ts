import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const uploadSubmission = upload.fields([
  { name: 'thumbnail', maxCount: 1 }, // Max 1 thumbnail
  { name: 'gallery', maxCount: 3 }    // Max 3 gallery images
]);
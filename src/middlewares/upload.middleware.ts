import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({ storage,
  limits: {
    fileSize: 500 * 1024 * 1024 //500 mb max file size
  }
 });

export const uploadSubmission = upload.fields([
  { name: 'video', maxCount: 1},
  { name: 'thumbnail', maxCount: 1 }, // Max 1 thumbnail
  { name: 'gallery', maxCount: 3 }, // Max 3 gallery images
]);

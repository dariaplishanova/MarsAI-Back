import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/scaleway.js';
import crypto from 'crypto';

export const uploadToScaleway = async (file: Express.Multer.File, fileCategory: string): Promise<string> => {
  const folder = process.env.SCALEWAY_FOLDER;
  const bucket = process.env.SCALEWAY_BUCKET;
  const endpoint = process.env.SCALEWAY_ENDPOINT;

  const ext = file.originalname.split('.').pop();

  const safeName = `${crypto.randomUUID()}.${ext}`;
  const key = `${folder}/${fileCategory}/${safeName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }),
  );

  // Return the public URL so you can save it in your MariaDB
  return `${endpoint}/${bucket}/${key}`;
};

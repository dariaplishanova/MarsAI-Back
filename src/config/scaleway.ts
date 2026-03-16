import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.SCALEWAY_REGION || 'fr-par',
  endpoint: process.env.SCALEWAY_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.SCALEWAY_ACCESS_KEY || '',
    secretAccessKey: process.env.SCALEWAY_SECRET_KEY || '',
  },
});

export default s3;

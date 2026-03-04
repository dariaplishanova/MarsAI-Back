import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/scaleway.js";
import crypto from "crypto";

export const uploadToScaleway = async (file: Express.Multer.File, fileCategory: string): Promise<string> => {
  // FIXED: Removed "_NAME" to perfectly match the .env file from the course
  const folder = process.env.SCALEWAY_FOLDER;
  const bucket = process.env.SCALEWAY_BUCKET; 
  const endpoint = process.env.SCALEWAY_ENDPOINT;

  // Extract the original extension (e.g., .jpg, .png)
  const ext = file.originalname.split(".").pop();
  
  // Create a unique name using random UUID
  const safeName = `${crypto.randomUUID()}.${ext}`;
  const key = `${folder}/${fileCategory}/${safeName}`;

  // Send the file to Scaleway
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer, // The file data stored in memory by Multer
      ContentType: file.mimetype,
      ACL: "public-read", // Makes the image viewable on your website
    })
  );

  // Return the public URL so you can save it in your MariaDB
  return `${endpoint}/${bucket}/${key}`;
};
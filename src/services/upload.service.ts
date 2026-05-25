import cloudinary from '../config/cloudinary.js';

/**
 * Pipes a temporary Multer file buffer directly up to a Cloudinary folder.
 * Returns a Promise that resolves to the secure web link once the upload completes.
 */
export const uploadMedia = async (file: Express.Multer.File, fileCategory: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Open an active write-stream pipeline pointing directly to our Cloudinary bucket
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: fileCategory,
        resource_type: 'auto', // Detects automatically if the stream is an image or an mp4 video
      },
      (error, result) => {
        // Halt if the network request fails or Cloudinary rejects the payload
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }

        // Safety check to ensure we actually received a valid data payload back
        if (!result) {
          return reject(new Error('Unknown Cloudinary error'));
        }

        // Return the permanent, secure HTTPS URL to our main service layer
        resolve(result.secure_url);
      },
    );

    // Hand the raw memory buffer chunk to the stream and seal the pipeline to kick off the upload
    uploadStream.end(file.buffer);
  });
};

/**
 * Extracts the asset identifiers from a full Cloudinary URL and executes
 * a hard deletion from the cloud storage bucket to prevent orphan files.
 */
export const deleteMedia = async (secureUrl: string): Promise<void> => {
  try {
    // Cloudinary paths contain '/upload/' right before the versioning and folder structure starts
    const urlParts = secureUrl.split('/upload/');
    if (urlParts.length < 2) return; // Exit if the string isn't a standard structured Cloudinary URL

    // Strip out the optional 'v12345678/' version digits to isolate the raw folder and file names
    const publicIdWithExtension = urlParts[1].replace(/^v\d+\//, '');

    // Remove the file extension (like .jpg or .mp4) since Cloudinary destroys files using raw IDs only
    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));

    // Cloudinary treats video files and images differently during API destruction requests
    const isVideo = secureUrl.includes('/video/');
    const resourceType = isVideo ? 'video' : 'image';

    // Trigger the remote API destroy call using our formatted folder path and resource group
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    // Log a confirmation or warning based on Cloudinary's explicit server feedback status
    if (result.result === 'ok') {
      console.log(`[Cloudinary Cleanup]: Safely deleted orphan asset: ${publicId}`);
    } else {
      console.warn(`[Cloudinary Cleanup Warning]: Could not confirm asset deletion for ${publicId}. Result:`, result);
    }
  } catch (error) {
    // Do not crash the application if a cleanup step fails, but log the stack trace for tracking
    console.error(`[Cloudinary Cleanup Error]: Failed to remove asset ${secureUrl}:`, error);
    throw error;
  }
};

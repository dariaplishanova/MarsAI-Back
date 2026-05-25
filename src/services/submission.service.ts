import { PoolConnection } from 'mysql2/promise';
import pool from '../config/database.js';
import { uploadMedia, deleteMedia } from './upload.service.js';
import directorModel from '../models/director.model.js';
import movieModel from '../models/movie.model.js';
import collaboratorModel from '../models/collaborator.model.js';
import imageModel from '../models/image.model.js';
import { MovieType, DirectorType, CollaboratorType, SubmissionTextPayload, SubmissionFiles } from '../types/type.js';

/**
 * Orchestrates the complete film festival submission process.
 * Handles parallel cloud media uploads, frontend-to-database data mapping,
 * and multi-table ACID database transactions with automatic file cleanup on failure.
 */
export const processSubmission = async (
  textData: SubmissionTextPayload,
  files: SubmissionFiles,
): Promise<{ success: boolean }> => {
  // Array to track every successfully uploaded cloud URL for fallback cleanup if the database crashes
  const uploadedUrls: string[] = [];

  let videoUrl = '';
  let thumbnailUrl = '';
  let galleryUrls: string[] = [];

  try {
    // 1. Process and upload core media files to Cloudinary
    if (files.video) {
      videoUrl = await uploadMedia(files.video, 'videos');
      uploadedUrls.push(videoUrl); // Save the URL immediately to track it for safety
    }

    if (files.thumbnail) {
      thumbnailUrl = await uploadMedia(files.thumbnail, 'thumbnails');
      uploadedUrls.push(thumbnailUrl); // Save the URL immediately to track it for safety
    }

    // Fire all gallery image uploads in parallel using Promise.all to maximize upload speeds
    if (files.gallery && files.gallery.length > 0) {
      galleryUrls = await Promise.all(files.gallery.map((file) => uploadMedia(file, 'gallery')));
      // Spread out and push all successfully generated gallery URLs into our tracking array
      uploadedUrls.push(...galleryUrls);
    }

    // 2. Map camelCase frontend fields strictly to our database model rules
    const directorData: DirectorType = {
      gender: textData.civility,
      firstname: textData.firstName,
      lastname: textData.lastName,
      birthday: textData.birthDate,
      email: textData.email,
      country: textData.country,
      newsletter: textData.newsletter === 'true' || textData.newsletter === true,
    };

    // Parse the collaborator JSON string back into a manageable array of objects
    const incomingCollaborators = JSON.parse(textData.collaborators || '[]');

    // 3. Request a single, dedicated connection box from our pool to handle the transaction
    const connection: PoolConnection = await pool.getConnection();

    // Freeze database saves—nothing becomes permanent until we explicitly commit
    await connection.beginTransaction();

    try {
      // Create the Director and pass our transaction connection context
      const newDirector = await directorModel.create(directorData, connection);
      const directorId = newDirector.insertId; // Capture the new auto-incremented primary key

      // Bundle the Movie payload, using the new directorId to map the foreign key relationship
      const movieData: MovieType = {
        director_id: directorId,
        title: textData.title,
        synopsis: textData.synopsis,
        language: textData.language,
        video_url: videoUrl,
        thumbnail: thumbnailUrl,
        stack: textData.techStack,
        duration: Number(textData.duration),
        ia_type: textData.aiClassification === '100' ? '100% IA' : 'Hybride',
        status: 'pending', // Submissions start out hidden in the moderation queue
      };

      // Create the Movie within the same transaction connection block
      const newMovie = await movieModel.create(movieData, connection);
      const movieId = newMovie.insertId; // Capture the new movie's ID to link sub-tables

      // Loop through and insert each collaborator, referencing the new movieId
      if (incomingCollaborators.length > 0) {
        for (const collab of incomingCollaborators) {
          const collabData: CollaboratorType = {
            movie_id: movieId,
            // Fallback supports both standard variations of incoming property layouts smoothly
            firstname: collab.firstname || collab.firstName || '',
            lastname: collab.lastname || collab.lastName || '',
            job: collab.job || '',
            email: collab.email || '',
          };
          await collaboratorModel.create(collabData, connection);
        }
      }

      // Map gallery links to image insertion promises and resolve them inside the transaction
      if (galleryUrls.length > 0) {
        const imagePromises = galleryUrls.map((url) => imageModel.create({ url, movie_id: movieId }, connection));
        await Promise.all(imagePromises);
      }

      // If the code hits this point without any crashes, finalize and commit all rows permanently!
      await connection.commit();
      return { success: true };
    } catch (dbError) {
      // If ANY database insert failed, throw out all changes made in this connection box instantly
      await connection.rollback();
      throw dbError; // Pass the error up to our outer catch block for cloud file removal
    } finally {
      // Always unlock the database connection and hand it back to the global pool
      connection.release();
    }
  } catch (error) {
    // 4. FALLBACK ASSET WIPE
    // If a database crash triggered a rollback, remove the orphaned files from Cloudinary
    if (uploadedUrls.length > 0) {
      try {
        // Fire delete calls concurrently to wipe the files from your storage bucket immediately
        await Promise.all(uploadedUrls.map((url) => deleteMedia(url)));
        console.warn(`[Transaction Cleanup]: Cleaned up orphaned media files from Cloudinary:`, uploadedUrls);
      } catch (cleanupError) {
        console.error(`[CRITICAL]: Orphaned media files failed to delete during cleanup:`, cleanupError);
      }
    }

    // Bubble the error up to Express so your global errorHandler middleware returns the proper response
    throw error;
  }
};

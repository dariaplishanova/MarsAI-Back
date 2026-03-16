import { NextFunction, Request, Response } from 'express';
import { uploadToScaleway } from '../services/upload.service.js';
import directorModel from '../models/director.model.js';
import movieModel from '../models/movie.model.js';
import collaboratorModel from '../models/collaborator.model.js';
import pool from '../config/database.js';
import imageModel from '../models/image.model.js';

const createSubmission = async (req: Request, res: Response, next: NextFunction) => {
  const textData = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    let videoUrl = '';

    if (files && files.video && files.video[0]) {
      videoUrl = await uploadToScaleway(files.video[0], 'videos');
    }

    let thumbnailUrl = null;

    if (files && files.thumbnail && files.thumbnail[0]) {
      thumbnailUrl = await uploadToScaleway(files.thumbnail[0], 'thumbnails');
    }

    const galleryUrls: string[] = [];

    if (files && files.gallery && files.gallery.length > 0) {
      for (const file of files.gallery) {
        const url = await uploadToScaleway(file, 'gallery');
        galleryUrls.push(url);
      }
    }

    const directorData = {
      gender: textData.civility,
      firstname: textData.firstName,
      lastname: textData.lastName,
      birthday: textData.birthDate,
      email: textData.email,
      mobile: textData.mobile,
      address: textData.address,
      zip_code: textData.postCode,
      town: textData.city,
      country: textData.country,
      job: textData.job,
      question_about: textData.source,
      newsletter: textData.newsletter === 'true' || textData.newsletter === true,
      youtube_url: textData.youtube || '',
      instagram_url: textData.instagram || '',
      linkedin_url: textData.linkedin || '',
      facebook_url: textData.facebook || '',
      twitter_url: textData.twitter || '',
    };
    const collaborators = JSON.parse(textData.collaborators || '[]');

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const newDirector = await directorModel.create(directorData, connection);
      const directorId = newDirector.insertId;

      const movieData = {
        director_id: directorId,
        title: textData.title,
        title_en: textData.titleEn,
        synopsis_fr: textData.synopsis,
        synopsis_en: textData.synopsisEn,
        main_language: textData.language,
        language: textData.language,
        video_url: videoUrl,
        thumbnail: thumbnailUrl || '',
        stack: textData.techStack,
        methodology: textData.methodology,
        duration: Number(textData.duration),
        subtitles: textData.hasSubtitles === 'true' ? 'Oui' : 'Non',
        ia_type: (textData.aiClassification === '100' ? '100% IA' : 'Hybride') as '100% IA' | 'Hybride',
        status: 'pending' as 'pending' | 'in_review' | 'approved' | 'official_selection' | 'rejected',
      };
      const newMovie = await movieModel.create(movieData, connection);
      const movieId = newMovie.insertId;

      if (collaborators.length > 0) {
        for (const collab of collaborators) {
          const collabData = {
            movie_id: movieId,
            firstname: collab.firstName || collab.firstname,
            lastname: collab.lastName || collab.lastname,
            gender: collab.gender || 'N/A',
            job: collab.job || '',
            email: collab.email || '',
            role: collab.role || "Membre de l'équipe",
          };
          await collaboratorModel.create(collabData, connection);
        }
      }

      if (galleryUrls.length > 0) {
        const imagePromises = galleryUrls.map((url) => imageModel.create({ url: url, movie_id: movieId }, connection));
        await Promise.all(imagePromises);
      }
      
      await connection.commit();
      connection.release();

      return res.status(201).json({
        success: true,
        message: 'Upload and submission successful!',
      });
    } catch (dbError) {
      await connection.rollback();
      connection.release();
      throw dbError;
    }
  } catch (error) {
    next(error);
  }
};

export default { createSubmission };

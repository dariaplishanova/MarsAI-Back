import { Request, Response } from 'express';
import { uploadToScaleway } from '../services/upload.service.js';
import directorModel from '../models/director.model.js';
import movieModel from '../models/movie.model.js';
import collaboratorModel from '../models/collaborator.model.js';

const createSubmission = async (req: Request, res: Response) => {
  try {
    // 1. DATA EXTRACTION
    // I extract the text fields from the FormData that Multer parsed into req.body.
    const textData = req.body;
    
    // I explicitly cast req.files because standard Express types don't know the exact 
    // names of the files ("thumbnail" and "gallery") I configured in my Multer middleware.
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // ---------------------------------------------------------
    // STEP 1: UPLOAD FILES TO CLOUD (SCALEWAY)
    // ---------------------------------------------------------
    
    // 1A. Upload Thumbnail
    let thumbnailUrl = null;
    if (files && files.thumbnail && files.thumbnail[0]) {
      // I use 'await' here because I must pause the code execution. I cannot save the movie 
      // to the database until Scaleway finishes the upload and returns the public URL.
      thumbnailUrl = await uploadToScaleway(files.thumbnail[0], 'thumbnails');
    }

    // 1B. Upload Gallery Images
    const galleryUrls: string[] = [];
    if (files && files.gallery && files.gallery.length > 0) {
      // I loop through each image in memory and upload them one by one to the cloud.
      for (const file of files.gallery) {
        const url = await uploadToScaleway(file, 'gallery');
        galleryUrls.push(url);
      }
    }
    // Since SQL cannot store arrays natively, I convert the array of URLs into a JSON string 
    // so it can be safely saved in a single database column if needed later.
    const galleryUrlsString = JSON.stringify(galleryUrls);

    // ---------------------------------------------------------
    // STEP 2: DATABASE INSERTIONS (THE RELATIONAL CHAIN)
    // ---------------------------------------------------------

    // 2A. Insert Director
    // I must insert the Director BEFORE the Movie because the Movie table has a foreign key 
    // constraint depending on the Director's ID. 
    const directorData = {
      // Here, I act as a translator between the Frontend and the Backend. 
      // I map the frontend's camelCase variables to my database's strict snake_case columns.
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

      // FormData transmits all data over HTTP as strings. I must manually evaluate 
      // the string "true" to store an actual boolean (1 or 0) in MySQL.
      newsletter: textData.newsletter === 'true' || textData.newsletter === true,

      youtube_url: textData.youtube || '',
      instagram_url: textData.instagram || '',
      linkedin_url: textData.linkedin || '',
      facebook_url: textData.facebook || '',
      twitter_url: textData.twitter || '',
    };

    const newDirector = await directorModel.create(directorData);
    
    // I capture the auto-incremented ID that MySQL just created for this Director.
    const directorId = newDirector.insertId;

    // 2B. Insert Movie
    const movieData = {
      // I use the directorId I just captured to establish the relational link.
      director_id: directorId, 
      title: textData.title,
      title_en: textData.titleEn,
      synopsis_fr: textData.synopsis, 
      synopsis_en: textData.synopsisEn,
      main_language: textData.language, 
      yt_url: textData.youtubeUrl || '', 
      
      // I insert the public URL that Scaleway generated back in Step 1.
      thumbnail: thumbnailUrl || '', 
      stack: textData.techStack, 
      methodology: textData.methodology,

      // Since duration came from FormData as a string (e.g., "120"), I explicitly 
      // convert it to a Number to satisfy my strict TypeScript interface.
      duration: Number(textData.duration),
      subtitles: textData.hasSubtitles === 'true' ? 'Oui' : 'Non',

      // To respect my database ENUMs, I use the 'as' keyword. This forces TypeScript 
      // to recognize these as strict Literal Types, ensuring data integrity.
      ia_type: (textData.aiClassification === '100' ? '100% IA' : 'Hybride') as '100% IA' | 'Hybride',
      status: 'pending' as 'pending' | 'approved' | 'rejected',
    };

    const newMovie = await movieModel.create(movieData);
    
    // I capture the movie's new ID so I can link the team members to it.
    const movieId = newMovie.insertId;

    // 2C. Insert Collaborators
    // The frontend sent the complex array of collaborators as a stringified JSON object 
    // inside the FormData. I must parse it back into a readable JavaScript array here.
    const collaborators = JSON.parse(textData.collaborators || '[]');
    
    if (collaborators.length > 0) {
      for (const collab of collaborators) {
        const collabData = {
          // I apply the movieId to every single team member in this loop.
          movie_id: movieId, 

          // I use the logical OR (||) operator as a fallback, ensuring the database 
          // never receives 'undefined' if a field was left empty on the frontend.
          firstname: collab.firstName || collab.firstname,
          lastname: collab.lastName || collab.lastname,
          gender: collab.gender || 'N/A',
          job: collab.job || '',
          email: collab.email || '',
          role: collab.role || "Membre de l'équipe",
        };

        // I await the creation of each collaborator sequentially to ensure database stability.
        await collaboratorModel.create(collabData);
      }
    }

    // ---------------------------------------------------------
    // STEP 3: SUCCESS RESPONSE
    // ---------------------------------------------------------
    // If execution reaches this line, the entire transaction (Cloud + 3 DB Tables) was successful.
    return res.status(201).json({
      success: true,
      message: 'Upload and submission successful!',
    });
    
  } catch (error) {
    // If the Scaleway upload fails, or if a database constraint is violated, the code jumps here.
    // I log the error for debugging and return a 500 status so the frontend can show an error state.
    console.error('Submission Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur SERVEUR lors de la soumission',
      error,
    });
  }
};

export default { createSubmission };
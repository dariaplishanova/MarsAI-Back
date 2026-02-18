import { Request, Response } from 'express';
import directorModel from '../models/director.model.js';
import { DirectorType, Params } from '../types/type.js';

const getAllDirectors = async (req: Request, res: Response) => {
  try {
    const result = await directorModel.findAll();
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Aucun festival enregistré' });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Erreur SERVEUR', error });
  }
};
//--------------------------------------------------------------------------------

const getDirectorById = async (req: Request<Params>, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID requis.' });
    }
    const result = await directorModel.findById(id);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Réalisateur introuvable' });
    }
    return res
      .status(200)
      .json({ success: true, data: result, message: 'Réalisateur trouvé ' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Erreur SERVEUR', error });
  }
};
//--------------------------------------------------------------------------------

const createDirector = async (req: Request, res: Response) => {
  try {
    const data = req.body; // Les données brutes du Frontend

    // L'étape de TRADUCTION (Mapping)
    const newDirector: DirectorType = {
      // Colonne BDD      <--   Donnée Frontend
      firstname:          data.firstName, 
      lastname:           data.lastName,
      genre:              data.civility,   // Traduit "civility" en "genre"
      birthday:           data.birthDate,
      email:              data.email,
      mobile:             data.mobile,
      address:            data.address,
      zip_code:           data.postCode,   // Traduit "postCode" en "zip_code" (CRUCIAL)
      town:               data.city,       // Traduit "city" en "town"
      country:            data.country,
      job:                data.job,
      youtube_url: data.youtube,
  instagram_url: data.instagram,
  linkedin_url: data.linkedin,
  facebook_url: data.facebook,
  twitter_url: data.twitter,
      question_about:     data.source,
      newsletter:         data.newsletter
    };

    // Maintenant on envoie l'objet TRADUIT au modèle
    const result = await directorModel.create(newDirector);

    return res.status(201).json({ success: true, data: result });

  } catch (error) {
    return res.status(500).json({ message: 'Erreur Serveur', error });
  }
};
export default {
  getAllDirectors,
  getDirectorById,
  createDirector,
};

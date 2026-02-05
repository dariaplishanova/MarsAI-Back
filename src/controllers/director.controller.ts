import { Request, Response } from 'express'
import DirectorModel from '../models/director.model.js'
import { DirectorType, Params} from '../types/type.js'


const getAllDirectors = async (req: Request, res: Response ) => {
    try {
      const result = await DirectorModel.findAll() 
      if (result.length === 0) {
        return res.status(404).json({success: false, message: "Aucun festival enregistré"});
      }
      return res.status(200).json({ success: true, data: result });
  } catch (error) {
      return res.status(500).json({success: false,message: "Erreur SERVEUR", error})
    }
}
//--------------------------------------------------------------------------------

const getDirectorById = async (req: Request<Params>, res: Response) => {
    try {
      const id = req.params.id;
      const result = await DirectorModel.findById(id);
       if (result.length === 0) {
        return res.status(404).json({'success': false, 'message': 'Réalisateur introuvable' })
      }
      return res.status(200).json({'success': true, 'data':result, 'message': 'Réalisateur trouvé '})
    }catch(error) {
      return res.status(500).json({'success': false, 'message': 'Erreur SERVEUR', error})
    }
}
//--------------------------------------------------------------------------------

const createDirector = async (req: Request, res: Response) => {
    try {
      const director: DirectorType = req.body
      const results = await DirectorModel.create(director);
      if (!results) {
        return res.status(404).json({success: false, 'message': 'Erreur dans la création du Réalisateur'})
      } 
      return res.status(201).json({success: true, data: results, message: 'Réalisateur créer avec succès'});
    }
     catch (error){
      res.status(500).json({ message: 'Erreur SERVEUR', error });
}
//--------------------------------------------------------------------------------

}
export default {
getAllDirectors,
getDirectorById,
createDirector
}
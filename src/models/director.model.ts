import db from "../config/database.js"
import { DirectorType } from "../types/type.js"


const findAll = async () => {
const query = 'SELECT * FROM director';
const [result] = await db.execute(query);
return result as DirectorType[]
}
//--------------------------------------------------------------------------------

const findById = async (id: number) => {
const query = 'SELECT * FROM director WHERE id = ?';
const [result] = await db.execute(query, [id]);
return result as DirectorType[]
}
//--------------------------------------------------------------------------------

const create = async (director: DirectorType) => {
const query = 'INSERT INTO director (firstname, lastname, genre, birthday, email, mobile, address, zip_code, town, country, job, youtube_url, instagram_url, linkedin_url, facebook_url, twitter_url, question_about, newsletter, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
const [result] = await db.execute(query, [director.firstname, director.lastname, director.genre, director.birthday, director.email, director.mobile, director.address, director.zip_code, director.town, director.country, director.job, director.youtube_url, director.instagram_url, director.linkedin_url, director.facebook_url,director.twitter_url, director.question_about, director.newsletter]);
return result as DirectorType[]
}
//--------------------------------------------------------------------------------



export default {
findAll,
findById,
create

}
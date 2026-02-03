export interface MovieType{
  id?: number;
  title: string;
  yt_url: string;
  thumbnail: string;
  subtitles: string;
  stack: string;
  ia_type: string;
  status: string;
  director_id: number;
}
export interface Festival {
  id: number;
  name: string;
  decription: string;
  created_at: Date | string;
  start_at: Date | string;
  end_at: Date | string;
  status: 'Actif' | 'Inactif';
  booking_total: number;
}
export interface Params {
  id: string;
} 
export interface User {
    "id": number,
    "firstname": string,
    "lastname": string,
    "email": string,
    "password": string,
    "created_at": string,
    "updated_at": string,
    "festival_id": number
}
export interface Collaborator {
    "id": number,
    "firstname": string,
    "lastname": string,
    "email": string,
    "role": string,
    "movie_id": number
}
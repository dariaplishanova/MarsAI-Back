export interface MovieType {
  id: number;
  title: string;
  yt_url: string;
  thumbnail: string;
  subtitles: string;
  stack: string;
  ia_type: '100% IA' | 'Hybride';
  status: 'pending' | 'approved' | 'rejected';
  director_id: number;
  created_at: Date;
}
export interface FestivalType {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  start_at: Date;
  end_at: Date;
  status: 'Actif' | 'Inactif';
  booking_total: number;
}
export interface Params {
  id: number;
}
export interface UserType {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  hashedPassword: string;
  created_at: string;
  updated_at: string;
  festival_id: number;
  insertId: number;
}
export interface CollaboratorType {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  job: string;
  email: string;
  role: string;
  movie_id: number;
}
export interface DirectorType {
  id: number;
  firstname: string;
  lastname: string;
  genre: 'M.' | 'Mme';
  birthday: string;
  email: string;
  mobile: string;
  address: string;
  zip_code: string;
  town: string;
  country: string;
  job: string;
  youtube_url: string;
  instagram_url: string;
  linkedin_url: string;
  facebook_url: string;
  twitter_url: string;
  question_about:
    | 'Réseaux sociaux'
    | 'Moteur de recherche'
    | 'Bouche-à-oreille'
    | 'Presse / Média'
    | 'Autre festival'
    | 'Partenaire'
    | 'Autre';
  newsletter: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface EventType {
  id: number;
  title: string;
  start_at: Date;
  end_at: Date;
  capacity: number;
  remaining_seats: number;
  location: string;
  description: string;
  status: 'Ouvert' | 'Fermer';
}
export interface ParticipantType {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  job: string;
  created_at: Date;
}
export interface ImageType {
  id: number;
  url: string;
  created_at: Date;
}
export interface RoleType {
  id: number;
  name: string;
}
export interface TagType {
  id: number;
  name: string;
}
export interface RatingType {
  score_creativity: number;
  score_technical: number;
  score_message: number;
  comment: string;
  score_total: number;
  created_at: Date;
}
export interface LoginType {
  id: number;
  email: string;
  password: string;
  hashedPassword: string;
}

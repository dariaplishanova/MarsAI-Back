import { RowDataPacket } from 'mysql2/promise';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

/**
 *        MOVIE
 */

export interface MovieType {
  id?: number;
  title: string;
  title_en: string;
  synopsis_fr: string;
  synopsis_en: string;
  duration: number;
  language: string;
  video_url: string;
  thumbnail: string;
  subtitles: string;
  stack: string;
  methodology: string;
  ia_type: '100% IA' | 'Hybride';
  status: 'pending'| 'in_review'| 'approved'| 'official_selection'| 'rejected';
  director_id: number;
  created_at?: Date | string;
}

export interface MovieWithDirector extends MovieType {
  director_firstname: string;
  director_lastname: string;
}

/**
 *          USER
 */

export type UserRole = 'user' | 'jury' | 'admin' ;

export interface UserType {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface DirectorType {
  id?: number;
  firstname: string;
  lastname: string;
  gender: string;
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
  question_about: string;
  newsletter: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CollaboratorType {
  id?: number;
  firstname: string;
  lastname: string;
  gender: string;
  job: string;
  email: string;
  role: string;
  movie_id: number;
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
  id?: number;
  url: string;
  movie_id: number;
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
  user_id: number;
  movie_id: number;
  score_creativity: number;
  score_technical: number;
  score_message: number;
  comment: string;
  score_total: number;
  created_at?: Date | string;
}

export interface UserRow extends RowDataPacket, UserType {}
export interface MovieRow extends RowDataPacket, MovieType {}
export interface DirectorRow extends RowDataPacket, DirectorType {}
export interface RatingRow extends RowDataPacket, RatingType {}

export type RequestBody<T> = Request<ParamsDictionary, object, T, object>;
export type RequestParams<P extends ParamsDictionary> = Request<P, object, object, object>;
export type RequestParamsBody<P extends ParamsDictionary, T> = Request<P, object, T, object>;
export type RequestEmpty = Request<Record<string, never>, Record<string, never>, Record<string, never>>;

/**
 *      ERROR
 */

export interface AppError extends Error {
  status?: number;
  statusCode?: number;
}

export interface Params extends ParamsDictionary {
  id: string;
}

/**
 *      LOGIN
 */

export interface LoginType {
  id: number;
  email: string;
  password: string;
  hashedPassword: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email?: string;
    role?: string;
    // Ajoute ici les propriétés que tu as mises dans ton JWT lors du login
  };
}

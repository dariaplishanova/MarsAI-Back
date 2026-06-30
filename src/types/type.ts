import { RowDataPacket } from 'mysql2/promise';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

// 1. Core Database Entities
export interface SubmissionFiles {
  video?: Express.Multer.File;
  thumbnail?: Express.Multer.File;
  gallery?: Express.Multer.File[];
}

export interface SubmissionTextPayload {
  civility: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  country: string;
  newsletter: string | boolean;
  collaborators: string;
  title: string;
  synopsis: string;
  language: string;
  techStack: string;
  duration: string | number;
  aiClassification: string;
}

export interface MovieType {
  id?: number;
  title: string;
  synopsis: string;
  duration: number;
  language: string;
  video_url: string;
  thumbnail: string;
  stack: string;
  ia_type: '100% IA' | 'Hybride';
  status: 'pending' | 'in_review' | 'approved' | 'official_selection' | 'rejected';
  director_id: number;
  created_at?: Date | string;
  gallery_urls?: string | null;
  collaborators?: {
    id: number;
    firstname: string;
    lastname: string;
    job: string;
    email: string;
  }[];
}

export interface UserType {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: 'user' | 'jury' | 'admin';
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
  country: string;
  newsletter: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CollaboratorType {
  id?: number;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  movie_id: number;
}

export interface ImageType {
  id?: number;
  url: string;
  movie_id: number;
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

// 2. MySQL Row Wrapper Packets
export interface UserRow extends RowDataPacket, UserType {}
export interface MovieRow extends RowDataPacket, MovieType {}
export interface DirectorRow extends RowDataPacket, DirectorType {}
export interface RatingRow extends RowDataPacket, RatingType {}
export interface CollaboratorRow extends RowDataPacket, CollaboratorType {}
export interface ImageRow extends RowDataPacket, ImageType {}



// 3. Express Request Utilities (
export type RequestBody<T> = Request<ParamsDictionary, object, T, object>;
export type RequestParams<P extends ParamsDictionary> = Request<P, object, object, object>;
export type RequestParamsBody<P extends ParamsDictionary, T> = Request<P, object, T, object>;
export type RequestEmpty = Request<Record<string, never>, Record<string, never>, Record<string, never>>;

export interface AppError extends Error {
  status?: number;
  statusCode?: number;
}

export interface Params extends ParamsDictionary {
  id: string;
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
  };
}

import { ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../errors/AppError.js';
import { LoginCredentials, UserType } from '../types/type.js';
import UserModel from '../models/user.model.js';

export const login = async (credentials: LoginCredentials) => {
  const { email, password } = credentials;

  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password!);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '2h' });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    },
  };
};

export const register = async (userData: UserType) => {
  const { password, ...restData } = userData;
  const hashedPassword = await bcrypt.hash(password!, 10);

  const results = (await UserModel.create({
    ...restData,
    password: hashedPassword,
    role: 'jury',
  })) as ResultSetHeader;

  if (results.affectedRows === 0) {
    throw new AppError('Unexpected server error during registration', 500);
  }

  const userId = results.insertId;

  const token = jwt.sign({ userId, role: 'jury' }, process.env.JWT_SECRET as string, { expiresIn: '2h' });

  return {
    token,
    userId,
    user: {
      id: userId,
      ...restData,
      role: 'jury' as const,
    },
  };
};

export const getProfile = async (userId: number) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError('Profile not found', 404);
  }

  return {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  };
};

import { ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../errors/AppError.js';
import { LoginCredentials, UserType } from '../types/type.js';
import UserModel from '../models/user.model.js';
import { resend } from '../config/email.js';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET missing');
  }

  return secret;
}

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

export const verifyInvite = async (token: string) => {
  const secret = getJwtSecret();

  try {
    const decoded = jwt.verify(token, secret) as {
      email: string;
      role: string;
    };

    if (decoded.role !== 'jury') {
      throw new AppError('Invalid invitation', 403);
    }

    return {
      valid: true,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    throw new AppError('Invitation expired or invalid', 401);
  }
};

export const forgotPassword = async (email: string) => {
  const secret = getJwtSecret();

  const user = await UserModel.findByEmail(email);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const token = jwt.sign({ email }, secret, { expiresIn: '10m' });

  const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: ` <a href="${link}">Reset your password</a>`,
  });

  return {
    email,
    sent: true,
    expiresIn: '10m',
  };
};

export const resetPassword = async (password: string, token: string) => {
  const secret = getJwtSecret();

  const decoded = jwt.verify(token, secret) as {email: string};

  const email = decoded.email;

  const user = await UserModel.findByEmail(email)

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const results = await UserModel.updatePassword(user.id!, hashedPassword);

  return {
    email,
    updated: results.affectedRows > 0,
    message: 'Password updated successfully',
  };

};

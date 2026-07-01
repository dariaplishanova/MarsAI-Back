import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';
import { resend } from '../config/email.js';

export const inviteJury = async (email: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError('JWT_SECRET is missing', 500);
  }

  const token = jwt.sign({ email, role: 'jury' }, secret, { expiresIn: '24h' });

  const link = `${process.env.FRONTEND_URL}/register/${token}`;
  const loginLink = `${process.env.FRONTEND_URL}/login`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'You are invited as Jury',
    html: `
      <h2>You are invited as Jury</h2>
      <p>You have been invited to join the MarsAI jury panel.</p>
      <p>Click the link below to complete your registration:</p>
      <a href="${link}">Complete registration</a>
      <p>To login, click the link below:</p>
      <a href="${loginLink}">Login</a>
  `,
  });
  return {
    email,
    sent: true,
    expiresIn: '24',
  };
};

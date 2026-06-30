import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import * as AuthService from './auth.service.js';
import UserModel from '../models/user.model.js';

vi.mock('../models/user.model.js', () => ({
  default: {
    findByEmail: vi.fn(),
  },
}));

describe('AuthService.login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('should throw an error if user does not exist', async () => {
    vi.mocked(UserModel.findByEmail).mockResolvedValue(null);

    await expect(
      AuthService.login({
        email: 'test@test.com',
        password: 'password123',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw an error if password is incorrect', async () => {
    const hashedPassword = await bcrypt.hash('correctPassword', 10);

    vi.mocked(UserModel.findByEmail).mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      password: hashedPassword,
      firstname: 'John',
      lastname: 'Doe',
      role: 'jury',
    } as any);

    await expect(
      AuthService.login({
        email: 'test@test.com',
        password: 'wrongPassword',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should return a token and user information when credentials are valid', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    vi.mocked(UserModel.findByEmail).mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      password: hashedPassword,
      firstname: 'John',
      lastname: 'Doe',
      role: 'jury',
    } as any);

    const result = await AuthService.login({
      email: 'test@test.com',
      password: 'password123',
    });

    expect(result).toHaveProperty('token');
    expect(result.user.email).toBe('test@test.com');
    expect(result.user.firstname).toBe('John');
  });
});

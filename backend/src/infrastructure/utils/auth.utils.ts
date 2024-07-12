import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { jwtConstants } from '../../shared/constants/auth.constants';

// Function to hash passwords
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Function to compare passwords
export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Function to generate access token
export async function generateAccessToken(jwtService: JwtService, userId: string): Promise<string> {
  return jwtService.signAsync({ userId }, { expiresIn: '1h' });
}

// Function to generate refresh token
export function generateRefreshToken(): string {
  return uuidv4();
}

// Function to calculate expiry date for refresh tokens
export function calculateExpiryDate(days: number): Date {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  return expiryDate;
}

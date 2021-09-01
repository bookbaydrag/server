import { Request } from 'express';
import { validateUUID } from './error.js';

export function getAuthToken(req: Request): string {
  const authToken = req.header('authorization')?.slice(-36) || '';
  validateUUID(authToken, 'invalid auth token');
  return authToken;
}

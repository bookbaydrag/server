import { Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Maybe } from './types/types';

export class ServerError extends Error {
  private _statusCode: number;

  constructor(status: number, message?: string) {
    if (!message) {
      message = httpErrors[status.toString()];
    }
    super(message);
    this._statusCode = status;
  }

  get statusCode(): number {
    return this._statusCode;
  }
}

export const httpErrors: {[status: string]: string} = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Server Error',
};

export function validateUUID(
    uuid: string | MUUID.MUUID | undefined,
    message?: string,
): void {
  try {
    if (!uuid) {
      throw new Error;
    }
    MUUID.from(uuid);
  } catch (error) {
    throw new ServerError(400, message || 'invalid uuid');
  }
}

export function validateExists<T>(item: Maybe<T>, message?: string): T {
  if (!item) {
    throw new ServerError(404, message);
  }
  return item;
}

export function validateNotExpired(time: number, message?: string): void {
  if (time < Date.now()) {
    throw new ServerError(401, message);
  }
}

export function handleError(res: Response, error: any): void {
  let status = 500;

  if (error instanceof ServerError) {
    status = error.statusCode;
  }

  res
      .status(status)
      .json({
        error: error.message,
      });
}

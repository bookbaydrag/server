import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Session, Token } from '../models/index.js';
import { getAuthToken } from '../util/authorization.js';
import {
  handleError,
  validateExists,
  validateNotExpired,
  validateUUID,
} from '../util/error.js';
import { ONE_WEEK, setExpiration } from '../util/expiration.js';

const populateRules = {
  path: 'account',
  select: ['_id', 'email', 'personas'],
  populate: {
    path: 'personas',
    select: ['_id', 'dragName'],
  },
};

async function createSession(req: Request, res: Response): Promise<void> {
  try {
    // Get the token
    const token: string = req.body.token;
    validateExists(token, 'missing token');
    validateUUID(token);

    // Load the token from the database,
    // and make sure it's not missing or expired
    const foundToken = await Token.findById(
        MUUID.from(token),
    );
    validateExists(foundToken);
    validateNotExpired(foundToken.expiration, 'magic link expired');

    // Delete the token, since it's being used
    await Token.findByIdAndDelete(
        MUUID.from(token),
    );

    // Create a new session for the user
    const newSession = await Session.create({
      account: foundToken.account,
    });
    newSession.populate(populateRules);
    await newSession.execPopulate();

    res
        .status(200)
        .json(newSession);
    return;
  } catch (error) {
    handleError(res, error);
  }
}

async function validateSession(req: Request, res: Response): Promise<void> {
  try {
    const authToken = getAuthToken(req);

    const foundSession = await Session.findById(MUUID.from(authToken));
    validateExists(foundSession, 'invalid session');
    validateNotExpired(foundSession.expiration);

    const updatedSession = await Session.findByIdAndUpdate(
        MUUID.from(authToken),
        { expiration: setExpiration(ONE_WEEK) },
        { new: true },
    )
        .populate(populateRules);
    res
        .status(200)
        .json(updatedSession);
  } catch (error) {
    handleError(res, error);
  }
}

async function removeSession(req: Request, res: Response): Promise<void> {
  try {
    const authToken = getAuthToken(req);

    const removedSession = await Session.findByIdAndDelete(
        MUUID.from(authToken),
    )
        .select(['_id', 'account']);

    res
        .status(200)
        .json(removedSession);
  } catch (error) {
    handleError(res, error);
  }
}

export const SessionController = {
  createSession,
  validateSession,
  removeSession,
};

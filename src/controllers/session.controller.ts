import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Account, Session, Token } from '../models/index.js';
import {
  handleError,
  validateExists,
  validateNotExpired,
  validateUUID,
} from '../util/error.js';

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

    // Return the session ID and account info
    const account = await Account.findById(
        MUUID.from(foundToken.account),
    )
        .populate({
          path: 'personas',
          select: ['_id', 'dragName'],
        });

    res
        .status(200)
        .json({
          id: newSession._id,
          account,
        });
    return;
  } catch (error) {
    handleError(res, error);
  }
}

export const SessionController = {
  createSession,
};

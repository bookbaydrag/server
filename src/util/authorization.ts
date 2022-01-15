import { Request } from 'express';
import MUUID from 'uuid-mongodb';
import { Account } from '../models/account.model.js';
import { PersonaDocument } from '../models/persona.model.js';
import { Session, SessionDocument } from '../models/session.model.js';
import {
  ServerError,
  validateExists,
  validateNotExpired,
  validateUUID,
} from './error.js';


export function getAuthToken(req: Request): string {
  const authToken = req.header('authorization')?.slice(-36) || '';
  validateUUID(authToken, `invalid auth token: ${authToken}`);
  return authToken;
}

export async function validateReqSession( req: Request): Promise<SessionDocument> {
  try {
    const authToken = getAuthToken(req);
    console.log(authToken);

    const foundSession = validateExists<SessionDocument>(
        await Session.findById(
            MUUID.from(authToken),
        ),
        'invalid session');
    validateNotExpired(foundSession.expiration);

    const accountID = foundSession.account;
    const sessionAccount = await Account.findById(accountID);
    if (!sessionAccount) {
      throw new ServerError(401, 'no such user');
    }

    return foundSession;
  } catch (error) {
    throw new ServerError(401);
  }
}

export function validateOwner(session: SessionDocument, item: OwnedDocuments): void {
  if (item) {
    const account = MUUID.from(session.account).toString();
    if (!item.getOwners().includes(account)) {
      throw new ServerError(401);
    }
  }
}

export interface Owned {
  getOwners: ()=>string[];
}

type OwnedDocuments = PersonaDocument;

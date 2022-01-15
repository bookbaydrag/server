import mongoose, { Document, Model } from 'mongoose';
import MUUID from 'uuid-mongodb';
import {
  DEFAULT_SESSION_EXPIRATION,
  setExpiration,
} from '../util/expiration.js';
import { binaryUUID, toUUID } from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

export interface BaseSession {
  account: MUUID.MUUID;
  expiration: number;
}

export interface SessionDocument extends BaseSession, Document {};

export type SessionModel = Model<SessionDocument>;

const SessionSchema = new Schema<SessionDocument>({
  _id: {
    ...binaryUUID,
    default: uuid,
  },
  account: {
    ...binaryUUID,
    ref: 'Account',
    set: toUUID,
  },
  expiration: {
    type: Number,
    default: ()=>setExpiration(DEFAULT_SESSION_EXPIRATION),
  },
});

export const Session = model<SessionDocument, SessionModel>('Session', SessionSchema);

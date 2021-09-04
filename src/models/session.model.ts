import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import {
  DEFAULT_SESSION_EXPIRATION,
  setExpiration,
} from '../util/expiration.js';
import { binaryUUID, toUUID } from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

const SessionSchema = new Schema({
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

export const Session = model('Session', SessionSchema);

import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import { setExpiration } from '../util/expiration.js';
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
    // 1 week
    default: ()=>setExpiration(10080),
  },
});

export const Session = model('Session', SessionSchema);

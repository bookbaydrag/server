import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import { binaryUUID, binaryUUIDArray, toUUID } from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

const AccountSchema = new Schema({
  _id: {
    ...binaryUUID,
    default: uuid,
  },
  email: {
    type: 'string',
    required: true,
    lowercase: true,
    trim: true,
  },
  personas: {
    ...binaryUUIDArray,
    ref: 'Persona',
    set: toUUID,
  },
});

export const Account = model('Account', AccountSchema);

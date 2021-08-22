import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import {
  binaryUUID,
  binaryUUIDArray,
  toUUID,
} from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

const EventSchema = new Schema({
  _id: {
    ...binaryUUID,
    default: uuid,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  hosts: {
    ...binaryUUIDArray,
    ref: 'Persona',
    set: toUUID,
  },
  performers: {
    ...binaryUUIDArray,
    ref: 'Persona',
    set: toUUID,
  },
});

export const Event = model('Event', EventSchema);

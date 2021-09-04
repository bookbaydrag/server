import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import {
  binaryUUID,
  binaryUUIDArray,
  toUUID,
} from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

export interface BaseEvent {
  name: string;
  city: string;
  hosts: any[];
  performers: any[];
}

export interface EventDocument extends BaseEvent, Document {};

const EventSchema = new Schema<EventDocument>({
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

EventSchema.methods.getOwners = function(this: EventDocument): string[] {
  return this.hosts;
};

export const Event = model('Event', EventSchema);

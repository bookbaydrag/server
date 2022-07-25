import mongoose, { Model, Document } from 'mongoose';
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
export type EventModel = Model<EventDocument>;

const EventSchema = new Schema<EventDocument, EventModel>({
  _id: {
    ...binaryUUID as object,
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
    ...binaryUUIDArray as object,
    ref: 'Persona',
    set: toUUID,
  },
  performers: {
    ...binaryUUIDArray as object,
    ref: 'Persona',
    set: toUUID,
  },
});

EventSchema.methods.getOwners = function(this: EventDocument): string[] {
  return this.hosts;
};

export const Event = model('Event', EventSchema);

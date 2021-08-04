import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid-mongodb';

const { Schema, model } = mongoose;

const EventSchema = new Schema({
  _id: {
    type: 'object',
    value: { type: 'Buffer' },
    default: uuid,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    // minlength: 1,
  },
  host: {
    type: String,
    ref: 'Person',
  },
  performers: {
    type: [String],
    ref: 'Person',
  },
});

export const Event = model('Event', EventSchema);

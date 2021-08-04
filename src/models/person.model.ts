import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid-mongodb';

const { Schema, model } = mongoose;

const PersonSchema = new Schema({
  // Mandatory fields --------------------------------
  _id: {
    type: 'object',
    value: { type: 'Buffer' },
    default: uuid,
  },
  dragName: { type: String, required: true, minlength: 1 },
  pronouns: { type: String },
  phone: { type: String },
  email: { type: String },
  contactMethod: { type: [String] },
  city: { type: String },

  // Optional fields ---------------------------------
  picture: { type: String },
  otherName: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  tiktok: { type: String },
  website: { type: String },
  race: { type: String },
  ethnicity: { type: String },
  gender: { type: String },
  disability: { type: String },
  accommodations: { type: [String] },
  causes: { type: [String] },
  sexuality: { type: String },
}, { timestamps: true });

export const Person = model('Person', PersonSchema);

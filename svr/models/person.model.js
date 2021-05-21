import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const PersonSchema = new Schema({
  // Mandatory fields --------------------------------
  _id: {
    type: String,
    default: uuid,
  },
  dragName: { type: String, required: true, minlength: 1 },
  pronouns: { type: String, required: true, minlength: 1 },
  phone: { type: String, required: true, minlength: 10 },
  email: { type: String, required: true, minlength: 5 },
  contactMethod: { type: Array, required: true, minlength: 1 },
  city: { type: String, required: true, minlength: 1 },

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

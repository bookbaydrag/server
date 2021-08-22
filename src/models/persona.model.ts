import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import { binaryUUID } from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

const PersonSchema = new Schema({
  // Mandatory fields --------------------------------
  _id: {
    ...binaryUUID,
    default: uuid,
  },
  dragName: { type: String, required: true },
  pronouns: { type: String },
  // phone: { type: String },
  // email: { type: String },
  // contactMethod: { type: [String] },
  // city: { type: String },

  // // Optional fields ---------------------------------
  // picture: { type: String },
  // otherName: { type: String },
  // facebook: { type: String },
  // instagram: { type: String },
  // twitter: { type: String },
  // youtube: { type: String },
  // tiktok: { type: String },
  // website: { type: String },
  // race: { type: String },
  // ethnicity: { type: String },
  // gender: { type: String },
  // disability: { type: String },
  // accommodations: { type: [String] },
  // causes: { type: [String] },
  // sexuality: { type: String },
}, { timestamps: true });

export const Persona = model('Persona', PersonSchema);

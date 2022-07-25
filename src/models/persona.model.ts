/* eslint-disable no-unused-vars */
import mongoose, { Document, Model } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching-v3';
import MUUID from 'uuid-mongodb';
import { Owned } from '../util/authorization.js';
import { Gender, Locality } from '../util/types/types.js';
import { binaryUUID, toUUID } from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

export interface BasePersona {
  account: any;
  ethnicity: string;
  gender: Gender;
  locality: Locality;
  pronouns: string;
  stageName: string;
}

export interface PersonaDocument extends
  BasePersona,
  Document,
  Owned
  {};

export interface PersonaModel extends Model<PersonaDocument>, Owned {
  fuzzySearch: (seachTerm: string, ...args: any) => PersonaDocument[];
};

const PersonaSchema = new Schema<PersonaDocument>({
  _id: {
    ...binaryUUID as object,
    default: uuid,
  },
  account: {
    ...binaryUUID as object,
    ref: 'Account',
    set: toUUID,
  },
  ethnicity: { type: 'string' },
  gender: { type: String, enum: Gender },
  locality: { type: String, enum: Locality },
  pronouns: { type: String },
  stageName: { type: String, required: true },

  // race: { type: String },
  // sexuality: { type: String },
  // phone: { type: String },
  // email: { type: String },
  // contactMethod: { type: [String] },
  // city: { type: String },
  // picture: { type: String },
  // otherName: { type: String },
  // facebook: { type: String },
  // instagram: { type: String },
  // twitter: { type: String },
  // youtube: { type: String },
  // tiktok: { type: String },
  // website: { type: String },
  // disability: { type: String },
  // accommodations: { type: [String] },
  // causes: { type: [String] },
});

PersonaSchema.plugin(fuzzySearching, { fields: ['stageName'] });
PersonaSchema.methods.getOwners = function(this: PersonaDocument): string[] {
  return [MUUID.from(this.account).toString()];
};

export const Persona = model<PersonaDocument, PersonaModel>(
    'Persona',
    PersonaSchema,
);

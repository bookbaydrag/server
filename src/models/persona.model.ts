import mongoose, { Document, Model } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import MUUID from 'uuid-mongodb';
import { Owned } from '../util/authorization.js';
import { binaryUUID, toUUID } from '../util/uuid.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

export interface BasePersona {
  dragName: string;
  pronouns: string;
  account: any;
  gender: string;
  race: string;
  ethnicity: string;
  sexuality: string;
}

export interface PersonaDocument extends
  BasePersona,
  Document,
  Owned
  {};

export interface PersonaModel extends Model<PersonaDocument> {
  getOwners: ()=>string[];
  fuzzySearch: (seachTerm: string) => PersonaDocument[];
};

const PersonaSchema = new Schema<PersonaDocument>({
  _id: {
    ...binaryUUID,
    default: uuid,
  },
  dragName: { type: String, required: true },
  pronouns: { type: String },
  account: {
    ...binaryUUID,
    ref: 'Account',
    set: toUUID,
  },
  gender: { type: String },
  race: { type: String },
  ethnicity: { type: String },
  sexuality: { type: String },

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

PersonaSchema.plugin(fuzzySearching, { fields: ['dragName'] });
PersonaSchema.methods.getOwners = function(this: PersonaDocument): string[] {
  return [MUUID.from(this.account).toString()];
};

export const Persona = model<PersonaDocument, PersonaModel>(
    'Persona',
    PersonaSchema,
);

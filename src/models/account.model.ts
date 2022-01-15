import mongoose, { Document, Model } from 'mongoose';
import MUUID from 'uuid-mongodb';
import { Gender, Locality } from '../util/types/types.js';
import { binaryUUID, binaryUUIDArray, toUUID } from '../util/uuid.js';
import { PersonaDocument } from './persona.model.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

export interface NewAccount {
  email: string;
  ethnicity?: string;
  gender?: string;
  locality?: string;
  personas?: PersonaDocument[];
}

export type BaseAccount = Required<NewAccount>;
export interface AccountDocument extends BaseAccount, Document {};
export type AccountModel = Model<AccountDocument>;

const AccountSchema = new Schema<AccountDocument>({
  _id: {
    ...binaryUUID,
    default: uuid,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: 1,
  },
  ethnicity: {
    type: String,
    default: '',
  },
  gender: {
    type: Gender,
    default: '',
  },
  locality: {
    type: Locality,
    default: '',
  },
  personas: {
    ...binaryUUIDArray,
    ref: 'Persona',
    set: toUUID,
  },
});

export const Account = model<AccountDocument, AccountModel>('Account', AccountSchema);

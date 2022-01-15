import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';
import {
  binaryUUID,
  binaryUUIDArray,
  toUUID,
} from '../util/uuid.js';
import { AccountDocument } from './account.model.js';

const { Schema, model } = mongoose;
const { v4: uuid } = MUUID;

export interface BaseEmailPair {
  localParts: MUUID.MUUID[];
  accounts: AccountDocument[];
  emails: string[];
}

function twoUUIDs() {
  return [uuid(), uuid()];
}

export interface EmailPairDocument extends BaseEmailPair, Document {};

const EmailPairSchema = new Schema<EmailPairDocument>({
  _id: {
    ...binaryUUID,
    default: uuid,
  },
  localParts: {
    ...binaryUUIDArray,
    default: twoUUIDs,
  },
  accounts: {
    ...binaryUUIDArray,
    ref: 'Account',
    set: toUUID,
  },
  emails: {
    type: [String],
  },
});

EmailPairSchema.methods.matchAccount = function(this: EmailPairDocument, localPart: string): AccountDocument | null {
  const index = this.localParts.indexOf(MUUID.from(localPart));
  if (index > -1) {
    return this.accounts[index];
  }
  return null;
};

EmailPairSchema.methods.matchEmailPair = function(this: EmailPairDocument, localPart: string): string | null {
  const index = this.localParts.indexOf(MUUID.from(localPart));
  if (index > -1) {
    return this.emails[index];
  }
  return null;
};

export const EmailPair = model('EmailPair', EmailPairSchema);

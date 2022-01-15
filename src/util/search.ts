import { FilterQuery } from 'mongoose';
import {
  BasePersona,
  PersonaDocument,
} from '../models/persona.model.js';
// import { Gender, Locality } from './types/types.js';


// BasePersona {
//   account: any;
//   ethnicity: string;
//   gender: Gender;
//   locality?: Locality;
//   pronouns: string;
//   stageName: string;
// }

export function buildPersonaQueries(query: Partial<BasePersona>):
FilterQuery<PersonaDocument> {
  const personaFacets = [];
  const accountFacets = [];

  // if (query.gender && !valueIn(Gender, query.gender)) {
  //   delete query.gender;
  // }

  // if (query.locality && valueIn(Locality, query.locality)) {
  //   delete query.locality;
  // }

  const builtQuery: FilterQuery<PersonaDocument> = { ...query };
  return builtQuery;
}

export function valueIn(object: object, item: unknown): boolean {
  return Object.values(object).includes(item);
}

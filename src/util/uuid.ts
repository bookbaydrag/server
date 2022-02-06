import { Binary } from 'bson';
import MUUID from 'uuid-mongodb';

type StringForUUID = string | string[];
type UUIDFromString = MUUID.MUUID | MUUID.MUUID[];

type UUIDForString = Binary | Binary[];
type OtherData = any | any[];
type StringFromUUID = string | string[];

/**
 * Takes a string or arrays of strings which represent UUIDs
 * and converts them to MUUIDs
 * @param {StringForUUID} data
 * @return {UUIDFromString}
 */
export function toUUID(data: StringForUUID): UUIDFromString {
  if (Array.isArray(data)) {
    return data.map((uuid: string)=>{
      return MUUID.from(uuid);
    });
  }
  return MUUID.from(data);
}

/**
 * Takes any data and parses out any UUIDs from MUUIDs
 * @param {StringForUUID} data
 * @return {UUIDFromString}
 */
export function fromUUID(
    data: UUIDForString | OtherData,
): StringFromUUID | OtherData {
  if (Array.isArray(data)) {
    try {
      return data.map((uuid: Binary)=>{
        return MUUID.from(uuid).toString();
      });
    } catch (err) {
      return data;
    }
  }
  try {
    return MUUID.from(data).toString();
  } catch (err) {
    return data;
  }
}

export const binaryUUID = {
  type: 'object',
  value: { type: 'Buffer' },
  transform: fromUUID,
};

export const binaryUUIDArray = {
  ...binaryUUID,
  type: ['object'],
};

export function stringFromMUUID(binary: Binary): string {
  return MUUID.from(binary).toString();
}

/* eslint-disable no-unused-vars */

export type Maybe<T> = T | null | undefined;

export enum Ethnicity {
  UNSET = ''
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
  OTHER = 'other',
  UNSET = ''
}

export enum Locality {
  SF = 'San Francisco',
  NB = 'North Bay',
  EB = 'East Bay',
  SB = 'South Bay',
  UN = ''
}

export type CleanupRequest = {
  s3?: AWS.S3.DeleteObjectRequest;
  sqs?: AWS.SQS.DeleteMessageRequest;
}

export type SingleEmail = {
  email: string;
  name: string;
  localPart: string;
  compiled: string;
};

export type EmailDetails = {
  from: SingleEmail;
  to: SingleEmail;
}

export type SQSEmailMessage = {
  receipt: {
    action: {
      bucketName: string;
      objectKey: string;
    };
  };
}

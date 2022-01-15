import dotenv from 'dotenv';

dotenv.config();
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const DEV_ENV = !!process.env.DEV_ENV || false;
export const SQS_URL = process.env.SQS_URL || '';

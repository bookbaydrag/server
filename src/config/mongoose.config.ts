import mongoose, { Mongoose } from 'mongoose';
import { MONGODB_URI } from '../util/env.js';

export const dbConnect = async (): Promise<Mongoose> => {
  try {
    console.info('Connecting to database...');
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
      autoCreate: true,
    });
    console.info('DB connection successful');
  } catch (error) {
    console.info('Error connecting to database:\n' + error);
  } finally {
    return mongoose;
  }
};

export const dbDisconnect = mongoose.disconnect;

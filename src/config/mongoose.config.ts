import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';

export const dbConnect = async (): Promise<Mongoose> => {
  try {
    dotenv.config();
    const DBURI = process.env.MONGODB_URI || '';
    console.info('Connecting to database...');
    await mongoose.connect(DBURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.info('DB connection successful');
  } catch (error) {
    console.info('Error connecting to database:\n' + error);
  } finally {
    return mongoose;
  }
};

export const dbDisconnect = mongoose.disconnect;

import mongoose, { Mongoose } from 'mongoose';

export const dbConnect = async (): Promise<Mongoose> => {
  try {
    await mongoose.connect('mongodb://mongo.seannyphoenix.com:27017/bbd', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('DB connection successful');
  } catch (error) {
    console.log('Error connecting to database:\n' + error);
  } finally {
    return mongoose;
  }
};

export const dbDisconnect = mongoose.disconnect;

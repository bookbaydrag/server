import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo.seannyphoenix.com:27017/bbd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Established connection to the database'))
    .catch((err) => console.log('Something when wrong connecting to the database: ', err));

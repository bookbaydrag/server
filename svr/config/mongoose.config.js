const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crmdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Established connection to the database'))
    .catch((err) => console.log('Something when wrong connecting to the database: ', err));

const express = require('express');
const cors = require('cors');
const app = express();

require('./svr/config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./svr/routes/person.routes')(app);

const port = 8000;

app.listen(port, () => console.log(`Listening on port ${port}`) );
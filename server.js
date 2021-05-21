import express from 'express';
import cors from 'cors';
import personRouter from './svr/routes/person.routes';

const app = express();

require('./svr/config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(personRouter);

const port = 8000;

app.listen(port, () => console.log(`Listening on port ${port}`) );

import express from 'express';
import cors from 'cors';
import personRouter from './routes/person.routes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(personRouter);
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

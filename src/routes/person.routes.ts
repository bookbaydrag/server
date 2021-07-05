import * as express from 'express';
import { PersonController } from '../controllers/index.js';

export const PersonRouter = express.Router();

// Performer API calls to DB
// personRouter.get('/api', PersonController.index);
PersonRouter.get('/persons', PersonController.getAllPeople);
PersonRouter.get('/persons/:id', PersonController.getOnePerson);
PersonRouter.post('/persons', PersonController.createPerson);
PersonRouter.put('/persons/:id', PersonController.updatePerson);
PersonRouter.delete('/persons/:id', PersonController.deletePerson);

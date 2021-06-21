import * as express from 'express';
import PersonController from '../controllers/person.controller.js';

const personRouter = express.Router();

// Performer API calls to DB
// personRouter.get('/api', PersonController.index);
personRouter.get('/api/persons', PersonController.getAllPeople);
personRouter.get('/api/persons/:id', PersonController.getOnePerson);
personRouter.post('/api/persons', PersonController.createPerson);
personRouter.put('/api/persons/:id', PersonController.updatePerson);
personRouter.delete('/api/persons/:id', PersonController.deletePerson);

export default personRouter;

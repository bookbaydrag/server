import * as express from 'express';
import { PersonController } from '../controllers/index.js';

export const PersonRouter = express.Router();

PersonRouter.get('/', PersonController.getAllPeople);
PersonRouter.get('/:id', PersonController.getOnePerson);
PersonRouter.post('/', PersonController.createPerson);
PersonRouter.put('/:id', PersonController.updatePerson);
PersonRouter.delete('/:id', PersonController.deletePerson);

import * as express from 'express';
import { PersonController } from '../controllers/index.js';

export const PersonaRouter = express.Router();

PersonaRouter.get('/', PersonController.indexPersonas);
PersonaRouter.get('/:id', PersonController.getPersona);
PersonaRouter.post('/', PersonController.createPersona);
PersonaRouter.put('/:id', PersonController.updatePersona);
PersonaRouter.delete('/:id', PersonController.deletePersona);
PersonaRouter.get('/search/:searchTerm', PersonController.searchPersonas);

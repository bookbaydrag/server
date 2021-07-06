import * as express from 'express';
import { EventController } from '../controllers/index.js';

export const EventRouter = express.Router();

EventRouter.get('/', EventController.getAllEvents);
EventRouter.get('/:id', EventController.getOneEvent);
EventRouter.post('/', EventController.createEvent);
EventRouter.put('/:id', EventController.updateEvent);
EventRouter.delete('/:id', EventController.deleteEvent);

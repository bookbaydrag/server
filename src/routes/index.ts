import * as express from 'express';
import { EventRouter } from './event.routes.js';
import { PersonRouter } from './person.routes.js';

export const APIRouterV1 = express.Router();

APIRouterV1.use('/persons', PersonRouter);
APIRouterV1.use('/events', EventRouter);

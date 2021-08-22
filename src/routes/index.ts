import * as express from 'express';
import { AccountRouter } from './account.routes.js';
import { EventRouter } from './event.routes.js';
import { PersonaRouter } from './persona.routes.js';

export const APIRouterV1 = express.Router();

APIRouterV1.use('/accounts', AccountRouter);
APIRouterV1.use('/events', EventRouter);
APIRouterV1.use('/personas', PersonaRouter);

import * as express from 'express';
import { AccountRouter } from './account.routes.js';
import { EventRouter } from './event.routes.js';
import { PersonRouter } from './person.routes.js';

export const APIRouterV1 = express.Router();

APIRouterV1.use('/accounts', AccountRouter);
APIRouterV1.use('/events', EventRouter);
APIRouterV1.use('/persons', PersonRouter);

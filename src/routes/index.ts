import * as express from 'express';
import { AccountRouter } from './account.routes.js';
import { EventRouter } from './event.routes.js';
import { PersonaRouter } from './persona.routes.js';
import { SessionRouter } from './session.routes.js';
import { TokenRouter } from './token.routes.js';

export const APIRouterV1 = express.Router();

APIRouterV1.use('/accounts', AccountRouter);
APIRouterV1.use('/events', EventRouter);
APIRouterV1.use('/personas', PersonaRouter);
APIRouterV1.use('/session', SessionRouter);
APIRouterV1.use('/tokens', TokenRouter);

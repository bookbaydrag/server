import * as express from 'express';
import { SessionController } from '../controllers/index.js';

export const SessionRouter = express.Router();

SessionRouter.post('/', SessionController.createSession);

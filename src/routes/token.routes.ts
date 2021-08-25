import * as express from 'express';
import { TokenController } from '../controllers/index.js';

export const TokenRouter = express.Router();

TokenRouter.post('/', TokenController.sendMagicLink );

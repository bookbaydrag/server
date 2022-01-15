import * as express from 'express';
import { EmailPairController } from '../controllers/index.js';

export const EmailPairRouter = express.Router();

EmailPairRouter.post('/', EmailPairController.createEmailPair);
EmailPairRouter.get('/:email/:localPart', EmailPairController.createEmailPair);

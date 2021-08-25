import * as express from 'express';
import { AccountController } from '../controllers/index.js';

export const AccountRouter = express.Router();

AccountRouter.post('/', AccountController.createAccount);
AccountRouter.get('/:id', AccountController.getAccount);
AccountRouter.put('/:id', AccountController.updateAccount);
AccountRouter.delete('/:id', AccountController.deleteAccount);

import * as express from 'express';
import { AccountController } from '../controllers/index.js';

export const AccountRouter = express.Router();

AccountRouter.get('/:id', AccountController.getOneAccount);
AccountRouter.post('/', AccountController.createAccount);
AccountRouter.put('/:id', AccountController.updateAccount);
AccountRouter.delete('/:id', AccountController.deleteAccount);

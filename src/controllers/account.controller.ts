import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Account } from '../models/index.js';

const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const newAccount = await Account.create(req.body);
    res.json(newAccount);
  } catch (error) {
    res.json(error);
  }
};

const getAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const account = await Account.findById(MUUID.from(req.params.id))
        .populate({
          path: 'personas',
          select: ['_id', 'dragName'],
        });
    res.json(account);
  } catch (error) {
    res.json(error);
  }
};

const updateAccount = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
        MUUID.from(req.params.id),
        req.body,
        { new: true },
    )
        .populate({
          path: 'personas',
          select: ['_id', 'dragName'],
        });
    res.json(updatedAccount);
  } catch (error) {
    res.json(error);
  }
};

const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Account.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

export const AccountController = {
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
};

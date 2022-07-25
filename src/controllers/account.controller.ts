import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Gender, Locality } from '../util/types/types.js';
import { Account, Persona } from '../models/index.js';
import { validateExists } from '../util/error.js';

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
          select: ['_id', 'stageName'],
        });
    res.json(account);
  } catch (error) {
    res.json(error);
  }
};

const updateAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    let updatedAccount = validateExists(
        await Account.findByIdAndUpdate(
            MUUID.from(req.params.id),
            req.body,
            { new: true },
        ));


    updatedAccount = await updatedAccount.populate({
      path: 'personas',
      select: ['_id', 'stageName'],
    });


    await Promise.all(updatedAccount.personas.map(async function(persona) {
      validateExists(await Persona.findByIdAndUpdate(persona._id, {
        ethnicity: updatedAccount.ethnicity,
        gender: updatedAccount.gender as Gender,
        locality: updatedAccount.locality as Locality,
      }));
    }));

    res
        .status(200)
        .json(updatedAccount);
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

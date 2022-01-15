import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Account, Persona } from '../models/index.js';
import { BasePersona } from '../models/persona.model.js';
import { validateOwner, validateReqSession } from '../util/authorization.js';
import { handleError, validateExists } from '../util/error.js';

const createPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get session from auth token
    const session = await validateReqSession(req);

    // Get account from session
    const accountIdMUUID = MUUID.from(session.account);
    const accountIdString = accountIdMUUID.toString();
    const parentAccount = validateExists(await Account.findById(accountIdMUUID));

    const personaData: BasePersona = {
      ...req.body,
      account: accountIdString,
      ethnicity: parentAccount.ethnicity,
      gender: parentAccount.gender,
      locality: parentAccount.locality,
    };

    // Create persona
    const newPersona = await Persona.create(personaData);
    const personaID = newPersona._id;

    // Add persona to account
    await Account.findByIdAndUpdate(
        accountIdMUUID,
        {
          $push: {
            personas: personaID,
          },
        },
    );

    res.json(newPersona);
  } catch (error) {
    handleError(res, error);
  }
};

const indexPersonas = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundPersonas = await Persona.find({});
    res.json(foundPersonas);
  } catch (error) {
    handleError(res, error);
  }
};

const getPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundPersona = await Persona.findById(MUUID.from(req.params.id));
    res.json(foundPersona);
  } catch (error) {
    handleError(res, error);
  }
};

const updatePersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const personaID = req.params.id;
    const session = await validateReqSession(req);

    const foundPersona = validateExists(
        await Persona.findById(MUUID.from(personaID)),
    );
    validateOwner(session, foundPersona);

    const updatedPersona = await Persona.findByIdAndUpdate(
        foundPersona._id,
        req.body,
        { new: true },
    );
    res
        .status(200)
        .json(updatedPersona);
  } catch (error) {
    handleError(res, error);
  }
};

const deletePersona = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get session from auth token
    const session = await validateReqSession(req);

    // Find persona and validate owner
    const personaID = req.params.id;
    const foundPersona = validateExists(
        await Persona.findById(MUUID.from(personaID)),
    );
    validateOwner(session, foundPersona);

    // Delete persona
    const deleted = await Persona.findByIdAndDelete(MUUID.from(personaID));

    // Remove persona from account
    if (deleted) {
      await Account.findByIdAndUpdate(
          MUUID.from(deleted.account),
          {
            $pull: {
              personas: deleted.account,
            },
          },
      );
    }

    res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
};

const searchPersonas = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm: string = req.params.searchTerm;
    // if (!searchTerm && !Object.keys(req.query).length) {
    //   res
    //       .status(200)
    //       .json([]);
    //   return;
    // }
    console.log(searchTerm, req.query);
    const foundPersonas = searchTerm ?
     await Persona.fuzzySearch(searchTerm, req.query) :
     await Persona.find(req.query);

    console.log(foundPersonas);

    res
        .status(200)
        .json(foundPersonas);
  } catch (error) {
    handleError(res, error);
  }
};

export const PersonController = {
  createPersona,
  indexPersonas,
  getPersona,
  updatePersona,
  deletePersona,
  searchPersonas,
};

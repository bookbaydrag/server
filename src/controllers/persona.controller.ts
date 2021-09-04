import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Account, Persona } from '../models/index.js';
import { validateOwner, validateReqSession } from '../util/authorization.js';
import { handleError } from '../util/error.js';

const createPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get session from auth token
    const session = await validateReqSession(req);

    // Get account from session
    const accountID = MUUID.from(session.account).toString();
    const personaData = {
      ...req.body,
      account: accountID,
    };

    // Create persona
    const newPersona = await Persona.create(personaData);
    const personaID = newPersona._id;

    // Add persona to account
    await Account.findByIdAndUpdate(
        MUUID.from(accountID),
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

    const foundPersona = await Persona.findById(MUUID.from(personaID));
    validateOwner(session, foundPersona);

    delete req.body._id;

    if (foundPersona) {
      const updatedPersona = await Persona.findByIdAndUpdate(
          foundPersona._id,
          req.body,
          { new: true },
      );
      res.json(updatedPersona);
    }
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
    const foundPersona = await Persona.findById(MUUID.from(personaID));
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
    const foundPersonas = await Persona.fuzzySearch(searchTerm);

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

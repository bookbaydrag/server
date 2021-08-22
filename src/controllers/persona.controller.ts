import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Persona } from '../models/index.js';

const createPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPersona = await Persona.create(req.body);
    res.json(newPersona);
  } catch (error) {
    res.json(error);
  }
};

const indexPersonas = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundPersonas = await Persona.find({});
    res.json(foundPersonas);
  } catch (error) {
    res.json(error);
  }
};

const getPersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundPersona = await Persona.findById(MUUID.from(req.params.id));
    res.json(foundPersona);
  } catch (error) {
    res.json(error);
  }
};

const updatePersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPerson = await Persona.findByIdAndUpdate(
        MUUID.from(req.params.id),
        req.body,
        { new: true },
    );
    res.json(updatedPerson);
  } catch (error) {
    res.json(error);
  }
};

const deletePersona = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Persona.findByIdAndDelete(MUUID.from(req.params.id));
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

export const PersonController = {
  createPersona,
  indexPersonas,
  getPersona,
  updatePersona,
  deletePersona,
};

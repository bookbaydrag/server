import { Request, Response } from 'express';
import { Person } from '../models/index.js';

const createPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPerson = await Person.create(req.body);
    res.json(newPerson);
  } catch (error) {
    res.json(error);
  }
};

const getAllPeople = async (req: Request, res: Response): Promise<void> => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    res.json(error);
  }
};

const getOnePerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const person = await Person.findById(req.params.id);
    res.json(person);
  } catch (error) {
    res.json(error);
  }
};

const updatePerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );
    res.json(updatedPerson);
  } catch (error) {
    res.json(error);
  }
};

const deletePerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

export const PersonController = {
  createPerson,
  getAllPeople,
  getOnePerson,
  updatePerson,
  deletePerson,
};

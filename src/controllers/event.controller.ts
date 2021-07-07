import { Request, Response } from 'express';
import { Event } from '../models/index.js';

const populateRules = [{
  path: 'performers',
  select: ['_id', 'dragName'],
},
{
  path: 'host',
  select: ['_id', 'dragName'],
}];

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await Event.create(req.body);
    await Event.populate(newEvent, populateRules);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find({}).populate(populateRules);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id).populate(populateRules);
    if (!event) {
      res.sendStatus(404);
    }
    res.status(200).json(event);
  } catch (error) {
    res.json(error);
  }
};

const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    ).populate(populateRules);
    if (!updateEvent) {
      res.sendStatus(404);
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json(!!deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const EventController = {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  deleteEvent,
};

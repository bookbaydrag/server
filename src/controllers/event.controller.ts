import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Event } from '../models/index.js';

const eventPopulateRules = [{
  path: 'performers',
  select: ['_id', 'stageName'],
},
{
  path: 'host',
  select: ['_id', 'stageName'],
}];

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await Event.create(req.body);
    await Event.populate(newEvent, eventPopulateRules);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find({}).populate(eventPopulateRules);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(
        MUUID.from(req.params.id),
    ).populate(eventPopulateRules);
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
        MUUID.from(req.params.id),
        req.body,
        { new: true },
    ).populate(eventPopulateRules);
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
    const deleted = await Event.findByIdAndDelete(MUUID.from(req.params.id));
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

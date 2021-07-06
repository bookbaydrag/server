import { Request, Response } from 'express';
import { Event } from '../models/index.js';

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await Event.create(req.body);
    res.json(newEvent);
  } catch (error) {
    res.json(error);
  }
};

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.json(error);
  }
};

const getOneEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
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
    );
    res.json(updatedEvent);
  } catch (error) {
    res.json(error);
  }
};

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

export const EventController = {
  createEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
  deleteEvent,
};

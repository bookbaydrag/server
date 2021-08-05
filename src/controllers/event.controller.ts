import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
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
    const events = await Event.find({})
        .populate([{
          path: 'performers',
          select: ['_id', 'dragName'],
        },
        {
          path: 'hosts',
          select: ['_id', 'dragName'],
        }]);
    res.json(events);
  } catch (error) {
    res.json(error);
  }
};

const getOneEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(MUUID.from(req.params.id))
        .populate({
          path: 'performers',
          select: ['_id', 'dragName'],
        })
        .populate({
          path: 'hosts',
          select: ['_id', 'dragName'],
        });
    res.json(event);
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
    )
        .populate({
          path: 'performers',
          select: ['_id', 'dragName'],
        })
        .populate({
          path: 'hosts',
          select: ['_id', 'dragName'],
        });
    res.json(updatedEvent);
  } catch (error) {
    res.json(error);
  }
};

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Event.findByIdAndDelete(MUUID.from(req.params.id));
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

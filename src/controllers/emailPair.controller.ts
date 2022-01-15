import { Request, Response } from 'express';
import { EmailPair } from '../models/index.js';

const emailPairPopulateRules = [{
  path: 'accounts',
  select: ['_id', 'emailAddress'],
}];

const createEmailPair = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEmailPair = await EmailPair.create(req.body);
    await EmailPair.populate(newEmailPair, emailPairPopulateRules);
    res.status(201).json(newEmailPair);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEmailPair = async (req: Request, res: Response): Promise<void> => {
  try {
    const foundEmailPair = await EmailPair.find(req.body).populate(emailPairPopulateRules);
    res.status(200).json(foundEmailPair);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const EmailPairController = {
  createEmailPair,
  getEmailPair,
};

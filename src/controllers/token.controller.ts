import { Request, Response } from 'express';
import MUUID from 'uuid-mongodb';
import { Account, Token } from '../models/index.js';
import { sendActivationEmail } from '../util/SES.js';

const sendMagicLink = async (req: Request, res: Response): Promise<void> => {
  try {
    let email: string = req.body.email;
    if (!email) {
      res
          .status(400);
      return;
    }
    email = email.toLowerCase().trim();

    // Get the account for this email
    let account = await Account.findOne({ email });

    // If one does not exist, create one
    if (!account) {
      account = await Account.create({ email });
    }

    // Look for and delete any current token for this account
    let token = await Token.findOne({ account: MUUID.from(account._id) });
    if (token) {
      await Token.findByIdAndDelete(token._id);
    }

    // Create a new token
    token = await Token.create({ account: account._id });

    await sendActivationEmail(email, token._id);
    res
        .status(200)
        .json(token);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const TokenController = {
  sendMagicLink,
};

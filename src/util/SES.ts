import AWS, { AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { DEV_ENV } from './env.js';

const Addresses = {
  ContactDefault: '"Book Bay Drag Contact Message" <contact@bookbaydrag.com>',
  MagicLink: '"Book Bay Drag Sign-In" <sign-in@bookbaydrag.com>',
};

AWS.config.update({ region: 'us-west-2' });
const sesv2 = new AWS.SESV2({ apiVersion: 'latest' });

function createMagicLinkEmail(token: string): string {
  const magicLink = DEV_ENV ?
    `http://localhost:3000/account/${token}` :
    `https://bookbaydrag.com/account/${token}`;
  return `Book Bay Drag\n\nFollow this link to complete sign-in. ${magicLink}${DEV_ENV ? `\n\n${token}` : ''}`;
}

export async function sendActivationEmail(
    emailAddress: string,
    token: string,
): Promise<PromiseResult<AWS.SESV2.Types.SendEmailResponse, AWSError>> {
  const text = createMagicLinkEmail(token);
  const params: AWS.SESV2.SendEmailRequest = {
    Content: {
      Simple: {
        Subject: {
          Data: 'Book Bay Drag Sign-In Link',
          Charset: 'UTF-8',
        },
        Body: {
          // Html: {
          //   Data: html,
          // },
          Text: {
            Data: text,
          },
        },
      },
    },
    FromEmailAddress: Addresses.MagicLink,
    Destination: {
      ToAddresses: [emailAddress],
    },
  };
  const result = await sesv2.sendEmail(params).promise();
  return result;
}

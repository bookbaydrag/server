import AWS, { AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

AWS.config.update({ region: 'us-west-2' });
const sesv2 = new AWS.SESV2({ apiVersion: 'latest' });

function createMagicLinkEmail(token: string): string {
  const magicLink = `https://bookbaydrag.com/account/${token}`;
  // const magicLink = `http://localhost:3000/account/${token}`;
  return `Follow this link to complete sign-in. ${magicLink}`;
}

export async function sendActivationEmail(
    emailAddress: string,
    token: string,
): Promise<PromiseResult<AWS.SESV2.Types.SendEmailResponse, AWSError>> {
  const text = createMagicLinkEmail(token);
  const params = {
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
    FromEmailAddress: '"Book Bay Drag Sign-In" <sign-in@bookbaydrag.com>',
    Destination: {
      ToAddresses: [emailAddress],
    },
  };
  const result = await sesv2.sendEmail(params).promise();
  return result;
}

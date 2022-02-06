import AWS from 'aws-sdk';
import { ParsedMail, simpleParser } from 'mailparser';
import { FilterQuery } from 'mongoose';
import MUUID from 'uuid-mongodb';
import { EmailPair, EmailPairDocument } from '../models/emailPair.model.js';
import { DEV_ENV, SQS_URL } from '../util/env.js';
import { validateExists } from '../util/error.js';
import { terminateServer } from '../util/signal.js';
import { CleanupRequest, EmailDetails, SingleEmail, SQSEmailMessage } from '../util/types/types.js';
import { stringFromMUUID } from '../util/uuid.js';

AWS.config.update({ region: 'us-west-2', apiVersion: 'latest' });
const SQS = new AWS.SQS();
const S3 = new AWS.S3();
const SESV2 = new AWS.SESV2();

async function pollSQS() {
  try {
    console.info('Polling email SQS queue');

    // Continue to poll until the server is ended
    while (true) {
      // SQS.receiveMessage will wait up to 20 seconds,
      // then return with data or not
      const req = await SQS.receiveMessage({
        QueueUrl: SQS_URL,
        WaitTimeSeconds: 20,
        MaxNumberOfMessages: 10,
      }).promise();

      // If no results, go on to next loop and poll again
      if (!req.Messages) {
        continue;
      }

      // Messages is always an array, even if there is only one message
      // Relay each one
      req.Messages.forEach(relayEmail);
    }
  } catch (error) {
    console.error(error);
    // Any error gracefully shut down our server
    terminateServer();
  }
}

async function relayEmail(sqsMessage: AWS.SQS.Message) {
  try {
    // Typescript trickery
    const rawMessage = sqsMessage as Required<AWS.SQS.Message>;

    const cleanupRequest: CleanupRequest = {};

    cleanupRequest.sqs = {
      QueueUrl: SQS_URL,
      ReceiptHandle: rawMessage.ReceiptHandle,
    };

    const message: SQSEmailMessage = JSON.parse(rawMessage.Body);
    const { bucketName, objectKey } = message.receipt.action;
    cleanupRequest.s3 = {
      Bucket: bucketName,
      Key: objectKey,
    };


    try {
      const raw = await S3.getObject(cleanupRequest.s3).promise();

      const mail: ParsedMail = await simpleParser(raw.Body as Buffer);
      const details = await extractFromTo(mail);

      const params: AWS.SESV2.Types.SendEmailRequest = {
        Content: {
          Simple: {
            Subject: {
              Data: mail.subject || '',
              Charset: 'UTF-8',
            },
            Body: {
              // Html: {
              //   Data: html,
              // },
              Text: {
                Data: mail.text || '',
              },
            },
          },
        },
        FromEmailAddress: details.from.compiled,
        Destination: {
          ToAddresses: [details.to.compiled],
        },
      };

      await SESV2.sendEmail(params).promise();
    } catch (error) {
      console.error(error);
    } finally {
      cleanUp(cleanupRequest);
    }
  } catch (error) {
    console.error(error);
  }
};

async function cleanUp(request: CleanupRequest) {
  if (request.s3) {
    await S3.deleteObject(request.s3).promise();
  }
  if (request.sqs) {
    await SQS.deleteMessage(request.sqs).promise();
  }
}

async function extractFromTo(mail: ParsedMail): Promise<EmailDetails> {
  try {
    // Added for type checking
    if (mail.to && mail.from) {
      // Extract the email addresses.
      // The 'to' field might be an array, so just take the first one.
      const toItem = Array.isArray(mail.to) ? mail.to[0] : mail.to;
      const fromItem = mail.from;

      // More type checking/handling
      if (!toItem.value[0].address || !fromItem.value[0].address) {
        throw new Error('missing addresses!');
      }

      // Create an to query the database
      const query: FilterQuery<EmailPairDocument> = {
        localParts: MUUID.from(toItem.value[0].address.split('@')[0]),
        emails: fromItem.value[0].address,
      };

      // Query the database
      const emailPair = validateExists<EmailPairDocument>(await EmailPair.findOne(query), 'NoEmailPair');

      // Extract the details
      const emailOne: SingleEmail = {
        email: emailPair.emails[0],
        name: '',
        localPart: stringFromMUUID(emailPair.localParts[0]),
        compiled: '',
      };
      const emailTwo: SingleEmail = {
        email: emailPair.emails[1],
        name: '',
        localPart: stringFromMUUID(emailPair.localParts[1]),
        compiled: '',
      };

      // Sort them into proper from and to
      if (emailOne.email === query.emails && emailTwo.localPart === query.localParts?.toString()) {
        return {
          to: { ...emailTwo, compiled: emailTwo.email },
          from: { ...emailOne, compiled: `${emailOne.localPart}@${DEV_ENV ? 'dev.' : ''}bookbaydrag.com` },
        };
      } else {
        return {
          to: { ...emailOne, compiled: emailOne.email },
          from: { ...emailTwo, compiled: `${emailTwo.localPart}@${DEV_ENV ? 'dev.' : ''}bookbaydrag.com` },
        };
      }
    } else {
      throw new Error('invalid email message');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// This function is called when the server starts
export function startEmailPolling() {
  pollSQS();
}

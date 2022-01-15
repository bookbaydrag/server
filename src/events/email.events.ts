import AWS from 'aws-sdk';
import { simpleParser } from 'mailparser';
import { SQS_URL } from '../util/env.js';
import { terminateServer } from '../util/signal.js';

AWS.config.update({ region: 'us-west-2', apiVersion: 'latest' });
const SQS = new AWS.SQS();
const S3 = new AWS.S3();

async function pollSQS() {
  try {
    console.info('Polling email SQS queue');
    while (true) {
      const req = await SQS.receiveMessage({
        QueueUrl: SQS_URL,
        WaitTimeSeconds: 20,
        MaxNumberOfMessages: 10,
      }).promise();

      req.Messages?.forEach(relayEmail);
    }
  } catch (error) {
    console.error(error);
    terminateServer();
  }
}

async function relayEmail(sqsMessage: any) {
  try {
    const message = JSON.parse(sqsMessage.Body);
    const { bucketName, objectKey } = message.receipt.action;

    const raw = await S3.getObject({
      Bucket: bucketName,
      Key: objectKey,
    }).promise();

    const mail = await simpleParser(raw.Body as Buffer);

    const sesv2 = new AWS.SESV2({ apiVersion: 'latest' });
    const params = {
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
      FromEmailAddress: `lambda@bookbaydrag.com`,
      Destination: {
        ToAddresses: ['seannyphoenix@gmail.com'],
      },
    };

    await sesv2.sendEmail(params).promise();

    await S3.deleteObject({
      Bucket: bucketName,
      Key: objectKey,
    }).promise();

    await SQS.deleteMessage({
      QueueUrl: SQS_URL,
      ReceiptHandle: sqsMessage.ReceiptHandle,
    }).promise();
  } catch (error) {
    console.error(error);
  }
};

export function startEmailPolling() {
  pollSQS();
}

const AWS = require('aws-sdk');
const simpleParser = require('mailparser').simpleParser;

exports.handler = async (event) => {
  for (let x = 0; x < event.Records.length; x++) {
    const message = JSON.parse(event.Records[x].Sns.Message);

    const { bucketName, objectKey } = message.receipt.action;

    const s3 = new AWS.S3();
    const raw = await s3.getObject({
      Bucket: bucketName,
      Key: objectKey,
    }).promise();

    const mail = await simpleParser(raw.Body);

    const sesv2 = new AWS.SESV2({ apiVersion: 'latest' });
    const params = {
      Content: {
        Simple: {
          Subject: {
            Data: mail.subject,
            Charset: 'UTF-8',
          },
          Body: {
          // Html: {
          //   Data: html,
          // },
            Text: {
              Data: mail.text,
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

    const deleted = await s3.deleteObject({
      Bucket: bucketName,
      Key: objectKey,
    }).promise();

    console.log(deleted);
  }
};

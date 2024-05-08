import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendSMS = (to: string, body: string) => {
  return client.messages.create({
    to,
    from: TWILIO_PHONE_NUMBER,
    body,
  });
};

import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });
export default {
  serverPort: process.env.PORT || 8080,
  accessKey: process.env.ACCESS_TOKEN_SECRET,
  database: {
    endPoint: process.env.DB_URL,
  },
  encryptionKey: process.env.ENCRYPTION_KEY,
  mailGun: {
    apiKey: process.env.MAILGUN_KEY,
    url: process.env.MAILGUN_URL,
    sender: process.env.EMAIL_SENDER,
    password: process.env.EMAIL_PASS,
  },
  development: process.env.DEVELOPMENT,
  appKey: process.env.APP_KEY,
  appOrigin: process.env.APP_ORIGIN,
  authName: 'test',
  tokenLife: 1,
};

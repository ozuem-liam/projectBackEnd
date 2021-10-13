import crypto from 'crypto';
import config from './config';

export const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', config.authName],
  credentials: true,
};

export const sessionName = crypto.createHash('sha256').update('TESTP').digest('hex');
const expiresIn = new Date();
expiresIn.setHours(expiresIn.getHours() + 2); //2 hours

export const cookieOption = {
  secret: config.appKey,
  parseOptions: {
    name: sessionName,
    resave: true,
    saveUninitialized: true,
    expires: expiresIn,
    secure: config.development ? false : true,
    sameSite: config.development ? 'Lax' : 'Strict',
  },
};

export const rateLimit = {
  max: 50,
  timeWindow: '1 minute',
};


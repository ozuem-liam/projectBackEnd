import jwt from 'jsonwebtoken';
import { accessSecret } from '../utils/jwt-helpers';

export const verifyToken = (req, reply, done) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[2];

  jwt.verify(token, accessSecret, (err, decoded) => {
    if (err) {
      done(new Error('Unauthorized'));
    }

    req.user = {
      id: decoded.id, // pass in the user's info
    };
  });

  done();
};

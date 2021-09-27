import jwt from 'jsonwebtoken';
import { accessSecret } from '../utils/jwt-helpers';

export const verifyToken = (req, reply, done) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[2];
  //   const { token } = req.headers;

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

// export const verifyToken = (req, res, next) => {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// };

// import jwt from 'jsonwebtoken';

// export const authenticateToken = (token) => {
//   return (req, res, next) => {
//     // const authHeader = req.headers['authorization'];
//     // const token = authHeader && authHeader.split(' ')[1];
//     if (token == null)
//       return res.status(401).json({ error: 'null token' });
//     jwt.verify(
//       token,
//       "htbknsb9y3892hidsonc9i83",
//       (error, customer) => {
//         if (error) return res.status(403).json({ error });
//         req.customer = customer;
//         next();
//       },
//     );
//   };
// };

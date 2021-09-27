"use strict";
// import jwt from 'jsonwebtoken';
// const appConfig = require('../configs/config');
// export function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']; //Bearer TOKEN
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.status(401).json({ error: "Empty token"});
//     jwt.verify(token, appConfig.jwtSecret,(error, customer) => {
//         if(error) return res.status(403).json({error: error.message});
//         req.customer = customer;
//         next();
//     })
// }
// export const authMiddleware = (fastify) => {
//   fastify.addHook('preValidation', (request, response, done) => {
//     let token = request.headers[appConfig.authName] || '',
//       routerPath = request.routerPath;
//     routerPath = routerPath.split('/')[1];
//     const message = 'Invalid or expired token';
//     if (token === '') {
//       return sendError({
//         response,
//         message,
//         code: HttpStatusCode.FORBIDDEN,
//       });
//     } else if (token === appConfig.appKey) {
//       if (publicRoutes.includes(routerPath)) {
//         return done();
//       } else {
//         return sendError({
//           response,
//           message,
//           code: HttpStatusCode.FORBIDDEN,
//         });
//       }
//     } else if (request.cookies[appConfig.authName] == token) {
//       let currentUser = decrypt(token);
//       if (currentUser) {
//         console.log('user--', currentUser);
//         // currentUser = JSON.parse(currentUser);
//         // const customer = prisma.customer.findUnique()
//         // console.log(customer);
//         // const difference = dayjs.duration(
//         //   dayjs().diff(dayjs(customer)),
//         // );
//         // if (difference > appConfig.tokenLife) {
//         //   //token has expired
//         //   return sendError({
//         //     response,
//         //     message,
//         //     code: HttpStatusCode.UNAUTHORIZED,
//         //   });
//         // }
//         // request.body = { ...request.body, currentUser };
//         // return done();
//       } else {
//         //Invalid token
//         return sendError({
//           response,
//           message,
//           code: HttpStatusCode.UNAUTHORIZED,
//         });
//       }
//     } else {
//       //user has loged out but still trying to use token
//       return sendError({
//         response,
//         message,
//         code: HttpStatusCode.UNAUTHORIZED,
//       });
//     }
//   });
// };
//# sourceMappingURL=auth.js.map
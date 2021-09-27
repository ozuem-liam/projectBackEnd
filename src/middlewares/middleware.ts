import { corsOptions, cookieOption, rateLimit } from '../configs/app';
import { FastifyCookieOptions } from 'fastify-cookie';
import cookie from 'fastify-cookie';
// import {verifyToken} from './auth';

export default (fastify: any, opt, done) => {
  fastify.register(require('fastify-helmet'));
  fastify.register(require('fastify-cors'), corsOptions);
  fastify.register(require('fastify-rate-limit'), {
    ...rateLimit,
  });
  fastify.register(cookie, { cookieOption } as FastifyCookieOptions);
  done();
};



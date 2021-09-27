"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../configs/app");
// import * as auth from './auth';
exports.default = (fastify, opt, done) => {
    fastify.register(require('fastify-helmet'));
    fastify.register(require('fastify-cors'), app_1.corsOptions);
    fastify.register(require('fastify-rate-limit'), Object.assign({}, app_1.rateLimit));
    fastify.register(require('fastify-cookie'), app_1.cookieOption);
    // auth.authMiddleware(fastify);
    done();
};
//# sourceMappingURL=middleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(fastify, option, done) {
    fastify.register(require('./customer'), { prefix: '/customers' });
    // fastify.register(require('./profile'), { prefix: '/profile' });
    done();
}
exports.default = default_1;
//# sourceMappingURL=route.js.map
export default (fastify, option, done) => {
  fastify.register(require('./customer'), { prefix: '/customers' });
  fastify.register(require('./dispatcher'), { prefix: '/dispatcher' });
  fastify.register(require('./transaction'), { prefix: '/transaction' });
  fastify.register(require('./admin'), { prefix: '/admin' });
  done();
}

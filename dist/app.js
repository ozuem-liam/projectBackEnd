"use strict";
const fastify = require('fastify')({ logger: true });
require('dotenv').config();
const appConfig = require('./configs/config');
// fastify.register(require('fastify-postgres'), {
//   connectionString: appConfig.database.endPoint,
// });
//api doc
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'Test-Project' },
    },
});
// fastify.get('/user/:id', async  (req, reply) => {
//   const client = await fastify.pg.connect()
//   const { rows } = await client.query(
//   )
// })
fastify.get('/', async (req, reply) => {
    reply.send({ test: 'Hello' });
});
//   //Register middlewares
//   middleware(fastify);
//   //Register the routes
//   route(fastify);
// Run the server!
const start = async () => {
    try {
        const address = await fastify.listen(5000);
        console.log(`TEST is running on ${address}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=app.js.map
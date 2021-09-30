import { verifyToken } from './middlewares/auth';
import * as dotenv from 'dotenv';
const fastify = require('fastify')({ logger: true });

dotenv.config({ path: __dirname + '/.env' });

//api doc
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'Test-Project' },
  },
});

//Register middlewares
fastify.register(require('./middlewares/middleware'));
// fastify.register(require('./middlewares/auth'));

fastify.decorate('verifyToken', verifyToken);

//Register the routes
fastify.register(require('./routes/route'));

// Run the server!
const start = async () => {
  try {
    const address = await fastify.listen(5000);
    console.log(`TEST is running on ${address}`);
  } catch (err) {
    process.exit(1);
  }
};
start();

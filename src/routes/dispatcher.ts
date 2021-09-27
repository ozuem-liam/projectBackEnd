import dispatcher from '../controllers/index';
import {
  postDispatcherSchema,
  loginDispatcherSchema,
  postLocationSchema,
} from '../databases/schemas/dispatcher';

export default function (fastify, opt, next) {
  fastify.post(
    '/',
    postDispatcherSchema,
    dispatcher.dispatcher.createDispatcher,
  );
  fastify.patch(
    '/auth/login',
    loginDispatcherSchema,
    dispatcher.dispatcher.loginDispatcher,
  );
  //   fastify.patch('/delete', dispatcher.dispatcher.softdeletedispatcher);
  fastify.post(
    '/location',
    postLocationSchema,
    dispatcher.dispatcher.createLocation,
  );
  //   fastify.get(
  //     '/address/:dispatcher_id',
  //     dispatcher.dispatcher.getAddresses,
  //   );
  //   fastify.patch('/address/update', dispatcher.dispatcher.updateAddress);
  next();
}

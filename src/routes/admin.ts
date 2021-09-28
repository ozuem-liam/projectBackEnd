import admin from '../controllers/index';
import {
  postProductSchema,
  updateProductSchema,
  softdeleteProductSchema,
} from '../databases/schemas/product';

const postProductOpts = {
  schema: postProductSchema,
  handler: admin.admin.createProduct,
};
const updateProductOpts = {
  schema: updateProductSchema,
  handler: admin.admin.updateProduct,
};
const softdeleteProductOpts = {
  schema: softdeleteProductSchema,
  handler: admin.admin.softdeleteProduct,
};
const getProductsOpts = {
  handler: admin.admin.getProducts,
};
const getOneDispatcherOpts = {
  handler: admin.admin.getOneDispatchers,
};
const getDispatcherOpts = {
  handler: admin.admin.getDispatchers,
};
const addNotificationOpts = {
  handler: admin.customer.addNotification,
};
export default function (fastify, opt, next) {
  fastify.patch('/auth/login', admin.admin.loginAdmin); // login as Admin
  //   fastify.get('/orders', customer.customer.createAddress); // view all recent orders
  //   fastify.get('/orders/:order_id', customer.customer.getAddresses); // view one order
  //   fastify.post('/orders/send/:dispatcher_id', customer.customer.updateAddress); // send to rider available in a particular location.
  fastify
    .register(require('fastify-auth'))
    .after(() => privateAdminRoutes(fastify));
  next();
}

const privateAdminRoutes = (fastify: any) => {
  fastify.post('/', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...postProductOpts,
  }); // Add Products
  fastify.patch('/update', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...updateProductOpts,
  }); // Update Products
  fastify.get('/products', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...getProductsOpts,
  }); // Get Products
  fastify.patch('/delete', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...softdeleteProductOpts,
  }); // delete products

  fastify.get('/dispatchers', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...getDispatcherOpts,
  }); // view all riders
  fastify.get('/dispatchers/:id', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...getOneDispatcherOpts,
  }); // view one riders
  
  fastify.post('/notification', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...addNotificationOpts,
  });
};

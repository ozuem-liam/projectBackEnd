import customer from '../controllers/index';
import {
  postCustomerSchema,
  loginCustomerSchema,
  postAddressSchema,
  softdeleteCustomerSchema,
  updateAddressSchema,
} from '../databases/schemas/customer';

const postAddressOpts = {
  schema: postAddressSchema,
  handler: customer.customer.createAddress,
};

const softdeleteCustomerOpts = {
  schema: softdeleteCustomerSchema,
  handler: customer.customer.softdeleteCustomer,
};

const updateAddressOpts = {
  schema: updateAddressSchema,
  handler: customer.customer.updateAddress,
};

const getAddressOpts = {
  handler: customer.customer.getAddresses,
};

export default function (fastify, opt, next) {
  fastify.post(
    '/',
    postCustomerSchema,
    customer.customer.createCustomer,
  );
  fastify.patch(
    '/auth/login',
    loginCustomerSchema,
    customer.customer.loginUser,
  );

  fastify
    .register(require('fastify-auth'))
    .after(() => privateCustomerRoutes(fastify));
  next();
}

const privateCustomerRoutes = (fastify: any) => {
  fastify.patch('/delete', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...softdeleteCustomerOpts,
  });
  fastify.post('/address', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...postAddressOpts,
  });
  fastify.get('/address/:customer_id', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...getAddressOpts,
  });
  fastify.patch('/address/update', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...updateAddressOpts,
  });
};

import customer from '../controllers/index';
import {
  postCustomerSchema,
  loginCustomerSchema,
  postAddressSchema,
  softdeleteCustomerSchema,
  updateAddressSchema,
} from '../databases/schemas/customer';

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
  fastify.patch(
    '/delete',
    softdeleteCustomerSchema,
    customer.customer.softdeleteCustomer,
  );
  fastify.post(
    '/address',
    postAddressSchema,
    customer.customer.createAddress,
  );
  fastify.get(
    '/address/:customer_id',
    customer.customer.getAddresses,
  );
  fastify.patch(
    '/address/update',
    updateAddressSchema,
    customer.customer.updateAddress,
  );
  next();
}

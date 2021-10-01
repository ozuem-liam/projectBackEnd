import transaction from '../controllers/index';
// import { postCustomerSchema } from '../databases/schemas/customer';

export default function (fastify, opt, next) {
  fastify.get('/product', transaction.transaction.getProducts); // Get Products
  fastify.get('/product/:id', transaction.transaction.getOneProduct); // Get one product
  fastify.post('/product/add', transaction.transaction.addToOrder); // Add Product to order_items
  fastify.post('/pay/paypal', transaction.transaction.payPalPayment); // Pay with Paypal
  next();
}
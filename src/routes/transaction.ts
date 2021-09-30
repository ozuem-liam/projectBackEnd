import transaction from '../controllers/index';
// import { postCustomerSchema } from '../databases/schemas/customer';

export default function (fastify, opt, next) {
  fastify.get('/product', transaction.transaction.getProducts); // Get Products
  fastify.get('/product/:id', transaction.transaction.getOneProduct); // Get one product
  fastify.post('/product/add', transaction.transaction.addToOrder); // Add Product to order_items
//   fastify.patch('/update/product', customer.customer.loginUser); // Update order_items
//   fastify.post('/order_items', customer.customer.loginUser); // Add order_items to order
  // fastify.delete('/order_items/:id', admin.admin.createProduct); // delete order_items from order 
  fastify.post('/pay/paypal', transaction.transaction.payPalPayment); // Pay with Paypal
//   fastify.post('/pay/debit_card', admin.admin.getProducts); // Pay with debit card
//   fastify.patch('/pay/cash', admin.admin.softdeleteProduct); // Pay with cash
//   fastify.get('/orders/tracking', customer.customer.createAddress); // Order tracking
  next();
}
// import admin from '../controllers/index';
// import { postCustomerSchema } from '../databases/schemas/customer';

export default function (fastify, opt, next) {
//   fastify.post('/add/product', customer.customer.loginUser); // Add Product to order_items
//   fastify.patch('/update/product', customer.customer.loginUser); // Update order_items
//   fastify.post('/order_items', customer.customer.loginUser); // Add order_items to order
//   fastify.delete('/order_items/:id', admin.admin.createProduct); // delete order_items from order 
//   fastify.post('/pay/pay_pal', admin.admin.updateProduct); // Pay with Paypal
//   fastify.post('/pay/debit_card', admin.admin.getProducts); // Pay with debit card
//   fastify.patch('/pay/cash', admin.admin.softdeleteProduct); // Pay with cash
//   fastify.get('/orders/tracking', customer.customer.createAddress); // Order tracking
  next();
}
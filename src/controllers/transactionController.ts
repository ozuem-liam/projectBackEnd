import { request } from 'http';
import * as transactionService from '../services/transactionService';
import { sendSuccess, sendError } from './appController';
import paypal from 'paypal-rest-sdk';

// Get Products
export const getProducts = async (request: any, response: any) => {
  const { isSuccess, data } = await transactionService.getProducts();
  if (isSuccess) {
    return sendSuccess({ response, data });
  } else {
    return sendError({ response });
  }
};

// Get Products
export const getOneProduct = async (request: any, response: any) => {
  const { id } = request.params;
  const { isSuccess, data } = await transactionService.getOneProduct(
    id,
  );
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

// add to cart
export const addToOrder = async (request, response) => {
  const {id} = request.body;
  const { isSuccess, data } = await transactionService.addToOrder(id);
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};


paypal.configure({
  mode: 'sandbox',
  client_id:
    'ATQKkQiz9srm6PaJqMia4ydBdoss7P664MIoFqtoraDFHTBBZNrgl7pNXWfAeIFzHE7tCSJ6uVXGil3-',
  client_secret:
    'ELg0Hwd7EFZZMKrs6X1P1MfdA4eNDpo5_2GNJb2Wiv5qO9WVZHqbJMn9kRvEwrK3KS2yZ__VHZHlrsg_',
});


export const payPalPayment = async (request, response) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://127.0.0.1:5000/success",
      "cancel_url": "http://127.0.0.1:5000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "item",
          "sku": "item",
          "price": "1.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "1.00"
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      response.send('test');
    }
  })
}

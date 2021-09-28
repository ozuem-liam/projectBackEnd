import * as transactionService from '../services/transactionService';
import { sendSuccess, sendError } from './appController';

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

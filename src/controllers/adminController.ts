import * as adminService from '../services/adminServices';
import { sendSuccess, sendError } from './appController';



export const loginAdmin = async (request, response) => {
  const data = request.body;
  const resp = await adminService.loginAdmin(data);
  const {
    isSuccess,
    message,
    admin,
    accessToken = '',
  } = resp;
  if (isSuccess) {
    return sendSuccess({ response, message, data: {admin, accessToken}});
  }
  return sendError({ response, message });
};


export const createProduct = async (
  request: { body: any },
  response: any,
) => {
  const product = request.body;
  const { isSuccess, data, message } =
    await adminService.createProduct(product);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  } else {
    return sendError({ response, message });
  }
};

export const createCategory = async (
  request: { body: any },
  response: any,
) => {
  const category = request.body;
  const { isSuccess, data, message } =
    await adminService.createCategory(category);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  } else {
    return sendError({ response, message });
  }
};

// Delete Product
export const softdeleteProduct = async (
  request: { body: { id: string; is_delete: boolean } },
  response: any,
) => {
  const { id, is_delete } = request.body;
  const { isSuccess, data } = await adminService.softdeleteProduct(
    id,
    is_delete,
  );
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

// Get Products
export const getProducts = async (request: any, response: any) => {
  const { isSuccess, data } = await adminService.getProducts();
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

// Update Product
export const updateProduct = async (request: { body: any; }, response: any) => {
  const updateProduct = request.body;
  const { isSuccess, data } = await adminService.updateProduct(updateProduct);
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

// Get Dispatchers
export const getDispatchers = async (request: any, response: any) => {
  
  const { isSuccess, data } = await adminService.getDispatchers();
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

// Get Dispatchers
export const getOneDispatchers = async (
  request: { param: any },
  response: any,
) => {
  const id = request.param;
  const { isSuccess, data } = await adminService.getOneDispatchers(
    id,
  );
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};



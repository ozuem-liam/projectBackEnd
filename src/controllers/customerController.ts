import * as customerService from '../services/customerService';
import { sendSuccess, sendError } from './appController';
import { sendEmail } from '../utils/EmailClient';
import { encrypt } from '../utils/encryption';
import HttpStatusCode from '../models/HttpStatusCode';
import appConfig from '../configs/config';

const sender: any = appConfig.mailGun.sender;

export const loginUser = async (request, response) => {
  const data = request.body;
  const resp = await customerService.loginUser(data);
  const {
    isSuccess,
    message,
    customer = {},
    destination = '',
    accessToken = ''
  } = resp;
  if (isSuccess) {
    if (destination == 'dashboard') {
      loginSetUp({ response, customer });
    }
    return sendSuccess({ response, message, data: { destination, accessToken } });
  }
  return sendError({ response, message });
};

export const createCustomer = async (request, response) => {
  const data = request.body;
  const resp = await customerService.createCustomer(data);
  const {
    isSuccess,
    message,
    customer = {},
    destination = '',
  } = resp;
  if (isSuccess) {
    sendEmail(
      customer.email,
      sender,
      'Thank You Email',
      'Thank you for registering',
    );

    return sendSuccess({ response, message, data: { destination } });
  }
  return sendError({ response, message });
};

// Delete Customer
export const softdeleteCustomer = async (request, response) => {
  const { id, is_delete } = request.body;
  const { isSuccess, data } =
    await customerService.softdeleteCustomer({ id, is_delete });
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

// Add Address
export const createAddress = async (request, response) => {
  const address = request.body;
  const { isSuccess, data, message } =
    await customerService.createAddress(address);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  } else {
    return sendError({ response, message });
  }
};

// Get Address
export const getAddresses = async (request, response) => {
  const customer_id = request.param;
  const { isSuccess, data } = await customerService.getAddresses(
    customer_id,
  );
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

// Update Address
export const updateAddress = async (request, response) => {
  const { id, number, street, city, state } = request.body;
  const { isSuccess, data } = await customerService.updateAddress({
    id,
    number,
    street,
    city,
    state,
  });
  if (isSuccess) {
    return sendSuccess({ data, response });
  } else {
    return sendError({ response });
  }
};

const loginSetUp = ({ response, customer }) => {
  const { id, payment_type, email } = customer;
  //Generate auth token and save to cookie
  const authToken = encrypt(JSON.stringify({ id, email, payment_type }));
  return (response.cookie = (appConfig.authName, authToken));
};

export const addNotification = async (request, response) => {
  const notification = request.body;
  const { isSuccess, data, message } = await customerService.addNotification(notification);
  if (isSuccess) {
    return sendSuccess({ response, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

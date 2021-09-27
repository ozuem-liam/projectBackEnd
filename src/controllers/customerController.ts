import * as customerService from '../services/customerService';
import { sendSuccess, sendError } from './appController';
import { jwtTokens } from '../utils/jwt-helpers';
import { sendEmail } from '../utils/EmailClient';
import jwt from 'jsonwebtoken';
import { prisma } from '.prisma/client';
import { encrypt } from '../utils/encryption';
// import { authenticateToken } from '../middlewares/auth';
const appConfig = require('../configs/config');
// import  HttpStatusCode from '../models/HttpStatusCode';

export const loginUser = async (request, response) => {
  const data = request.body;
  const resp = await customerService.loginUser(data);
  const {
    isSuccess,
    message,
    customer = {},
    destination = '',
  } = resp;
  if (isSuccess) {
    if (destination == 'dashboard') {
      loginSetUp({ response, customer });
    }
    //JWT
    // let tokens = jwtTokens(customer);
    // const token = tokens.accessToken;
    // authenticateToken(token);
    // let token = tokens.accessToken;
    return sendSuccess({ response, message, data: { destination } });
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
    // JWT
    let tokens = jwtTokens(customer);
    sendEmail(
      customer.email,
      'ozuemdw@gmail.com',
      'Confirm Email',
      `Click link to confirm email http://localhost:5000/${tokens.accessToken}`,
    );
    // response.cookie('refresh_token', tokens.accessToken, {
    //   httpOnly: true,
    // });
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
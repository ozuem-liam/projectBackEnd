import * as dispatcherService from '../services/dispatcherService';
import { sendSuccess, sendError } from './appController';
import { jwtTokens } from '../utils/jwt-helpers';
import { sendEmail } from '../utils/EmailClient';



export const loginDispatcher = async (request, response) => {
  const data = request.body;
  const {
    isSuccess,
    message,
    dispatcher = {},
    destination = '',
  } = await dispatcherService.loginDispatcher(data);

  if (isSuccess) {
    //JWT
    let token = jwtTokens(dispatcher);
    return sendSuccess({ response, message, data: { destination, token } });
  }
  return sendError({ response, message });
};



export const createDispatcher = async (request, response) => {
  const data = request.body;
  const resp = await dispatcherService.createDispatcher(data);
  const {
    isSuccess,
    message,
    dispatcher = {},
    destination = '',
  } = resp;
  if (isSuccess) {
    // JWT
    let tokens = jwtTokens(dispatcher);
    sendEmail(
      dispatcher.email,
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


// Add Location
export const createLocation = async (request, response) => {
  const location = request.body;
  const { isSuccess, data, message } =
    await dispatcherService.createLocation(location);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  } else {
    return sendError({ response, message });
  }
};
import HttpStatusCode from '../models/HttpStatusCode';
import TPResponse from '../models/TPResponse';

export const sendSuccess = ({
  response,
  data = {},
  message = 'Request successful',
}) => {
  const resp = new TPResponse({ data, message });
  return response.status(HttpStatusCode.SUCCESS).send(resp);
};

export const sendError = ({
  response,
  errors = [],
  message = 'Invalid requests',
  code = HttpStatusCode.INVALID_REQUEST,
}) => {
  const resp = new TPResponse({
    data: {},
    message,
    errors: errors,
  });
  return response.status(code).send(resp);
};

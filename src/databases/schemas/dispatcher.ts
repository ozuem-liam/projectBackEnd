export const dispatcher = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    phone_number: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    address: { type: 'string' },
    is_available: { type: 'boolean' },
  },
};
export const postDispatcherSchema = {
  schema: {
    body: {
      type: 'object',
      required: [
        'last_name',
        'first_name',
        'email',
        'password',
        'phone_number',
        'address',
      ],
      properties: {
        id: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        phone_number: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        address: { type: 'string' },
        is_available: { type: 'boolean' },
      },
      reponse: {
        201: dispatcher,
      },
    },
  },
};


export const loginDispatcherSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        reponse: {
          200: dispatcher,
        },
      },
    },
  },
};

export const location = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    street: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    dispatcher_id: { type: 'string' },
  },
};


export const postLocationSchema = {
  schema: {
    body: {
      type: 'object',
      required: [
        'street',
        'city',
        'state',
      ],
      properties: {
        id: { type: 'string' },
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        dispatcher_id: { type: 'string' },
      },
      reponse: {
        201: location,
      },
    },
  },
};

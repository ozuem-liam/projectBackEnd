export const customer = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    last_name: { type: 'string' },
    first_name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    email_confirm: { type: 'boolean' },
    phone_number: { type: 'string' },
    payment_type: { type: 'string' },
  },
};
export const postCustomerSchema = {
  schema: {
    body: {
      type: 'object',
      required: [
        'last_name',
        'first_name',
        'email',
        'password',
        'phone_number',
        'payment_type',
      ],
      properties: {
        id: { type: 'string' },
        last_name: { type: 'string' },
        first_name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        email_confirm: { type: 'boolean' },
        phone_number: { type: 'string' },
        payment_type: { type: 'string' },
      },
      reponse: {
        201: customer,
      },
    },
  },
};

export const loginCustomerSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        reponse: {
          200: customer,
        },
      },
    },
  },
};


export const address = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    number: { type: 'number' },
    street: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    customer_id: { type: 'string' },
  },
};

export const postAddressSchema = {
  schema: {
    body: {
      type: 'object',
      required: [
        'number',
        'street',
        'city',
        'state',
      ],
      properties: {
        id: { type: 'string' },
        number: { type: 'number' },
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
      },
      reponse: {
        201: address,
      },
    },
  },
};

export const updateAddressSchema = {
  schema: {
    body: {
      type: 'object',
      required: [
        'number',
        'street',
        'city',
        'state',
      ],
      properties: {
        id: { type: 'string' },
        number: { type: 'number' },
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
      },
      reponse: {
        200: address,
      },
    },
  },
};

export const softdeleteCustomerSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['id', 'is_delete'],
      properties: {
        id: { type: 'string' },
        is_delete: { type: 'boolean' },
        reponse: {
          200: customer,
        },
      },
    },
  },
};
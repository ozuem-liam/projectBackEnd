const headerSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: 'string',
  },
};
export const product = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      desc: { type: 'string' },
      is_delete: { type: 'boolean' },
      created_at: { type: 'datetime' },
      cart_id: { type: 'string' },
      categories: { type: 'array' },
    },
  };

  export const postProductSchema = {
    schema: {
      headers: headerSchema,
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
          201: product,
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
            200: product,
          },
        },
      },
    },
  };
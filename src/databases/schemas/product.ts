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
    price: { type: 'number' },
    created_at: { type: 'array' },
    is_delete: { type: 'boolean' },
    cart: { type: 'array' },
    categories: { type: 'array' },
  },
};

export const categories = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    category_name: { type: 'string' },
    sku: { type: 'string' },
    products: { type: 'array' },
  },
};

export const postProductSchema = {
  schema: {
    headers: headerSchema,
    body: {
      type: 'object',
      required: [
        'name',
        'desc',
        'price',
        'is_delete',
        'category_name',
        'sku',
      ],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        desc: { type: 'string' },
        price: { type: 'number' },
        created_at: { type: 'string' },
        is_delete: { type: 'boolean' },
        categories: { type: 'array' },
      },
      reponse: {
        201: product,
      },
    },
  },
};

export const updateProductSchema = {
  schema: {
    headers: headerSchema,
    body: {
      type: 'object',
      required: ['id', 'name', 'desc', 'price', 'is_delete'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        desc: { type: 'string' },
        price: { type: 'number' },
        created_at: { type: 'array' },
        is_delete: { type: 'boolean' },
        categories: { type: 'array' },
      },
      reponse: {
        200: product,
      },
    },
  },
};

export const getProductSchema = {
  schema: {
    headers: headerSchema,
    reponse: {
      200: {
        type: 'array',
        products: product,
      },
    },
  },
};

export const softdeleteProductSchema = {
  schema: {
    headers: headerSchema,
    body: {
      type: 'object',
      required: ['id', 'is_delete'],
      properties: {
        id: { type: 'string' },
        is_delete: { type: 'boolean' },
        reponse: {
          200: product,
        },
      },
    },
  },
};

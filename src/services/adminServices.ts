import prisma from '../interfaces/client';
import { admins } from '../middlewares/admin';
import { jwtTokens } from '../utils/jwt-helpers';


export const loginAdmin = async ({
  email,
  password,
}): Promise<{
  isSuccess: boolean;
  message: string;
  admin?: any;
  accessToken?: any;
}> => {
  const admin = admins.filter((admin) => {
    return (admin.email = email);
  })[0];

  if (!admin) {
    const message = 'This admin does not exist';
    return { isSuccess: false, message };
  }
  if (password !== admin.password) {
    const message = 'Invalid credentials';
    return { isSuccess: false, message };
  }
  const id = admin;
  // sign a token
  const { accessToken } = jwtTokens(id);
  const message = 'Success';
  return { isSuccess: true, message, admin, accessToken };
};

export const createProduct = async ({
  name,
  desc,
  price,
  is_delete,
  category_name,
  sku,
}): Promise<{
  isSuccess: boolean;
  data?: any;
  message?: string;
  error?: any;
}> => {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        desc,
        price,
        is_delete,
        categories: {
          create: [
            {
              category_name,
              sku,
            },
          ],
        },
      },
    });
    const message = 'Product successfully added';
    return { isSuccess: true, data: product, message };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const createCategory = async ({
  name,
  desc,
  price,
  is_delete,
  created_at,
  category_name,
  sku,
}): Promise<{
  isSuccess: boolean;
  data?: any;
  message?: string;
  error?: any;
}> => {
  try {
    const created_at: any = Date.now();
    const category = await prisma.category.create({
      data: {
        category_name: category_name,
        sku: sku,
        products: {
          create: [
            {
              name,
              desc,
              price,
              is_delete,
              created_at: created_at,
            },
          ],
        },
      },
    });
    const message = 'Product successfully added';
    return { isSuccess: true, data: category, message };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const softdeleteProduct = async (
  id: string,
  is_delete: boolean,
): Promise<{ isSuccess: boolean; data?: any; error?: any }> => {
  try {
    const data = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        is_delete: is_delete,
      },
    });
    return { isSuccess: true, data };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const getProducts = async (): Promise<
  { isSuccess: boolean; data?: any } | any
> => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
      },
    });
    return { isSuccess: true, data: products };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const getDispatchers = async (): Promise<
  { isSuccess: boolean; data?: any } | any
> => {
  try {
    const dispatcher = await prisma.dispatcher.findMany({
      include: {
        locations: true,
      },
    });
    return { isSuccess: true, data: dispatcher };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const getOneDispatchers = async (
  id: string,
): Promise<{ isSuccess: boolean; data?: any } | any> => {
  try {
    const dispatcher = await prisma.dispatcher.findMany({
      where: {
        id: id,
      },
      include: {
        locations: true,
      },
    });
    return { isSuccess: true, data: dispatcher };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const updateProduct = async ({
  id,
  name,
  desc,
  price,
  is_delete,
  category_name,
  sku,
}): Promise<{
  isSuccess: boolean;
  data?: any;
  error?: any;
  message?: string;
}> => {
  try {
    const data = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        desc,
        price,
        is_delete,
        categories: {
          create: [
            {
              category_name,
              sku,
            },
          ],
        },
      },
    });
    return { isSuccess: true, data };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

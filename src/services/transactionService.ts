import prisma from '../interfaces/client';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { jwtTokens } from '../utils/jwt-helpers';
import { totalmem } from 'os';
dayjs.extend(duration);

// view all products
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

export const getOneProduct = async (
  id: string,
): Promise<{ isSuccess: boolean; data?: any } | any> => {
  try {
    const products = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return { isSuccess: true, data: products };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

// add to cart
export const addToOrder = async (
  id: string,
): Promise<{ isSuccess: boolean; data?: any } | any> => {
  try {
    const product: any = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (product) {
      const quantity: any = addQuantity();
      const product_details: any = {
        name: product.name,
        desc: product.desc,
        price: product.price,
        quantity: quantity,
      };
      // update product to cart
      const addToOrder = await prisma.order.create({
        data: {
          total_amount: product.price,
          products: {
            create: [
              {
                product_details: product_details,
                sub_total: product_details.price,
              },
            ],
          },
        },
      });
      return { isSuccess: true, data: addToOrder };
    }
  } catch (error) {
    return { isSuccess: false, error };
  }
};

const addQuantity = () => {
  let x = 1;
  x = ++x;
  return x;
};
// remove product from cart

// checkout to order and empty cart and start delivery time

// pay with cash

// pay with paypal

// pay with card

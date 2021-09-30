import prisma from '../interfaces/client';
import messages from '../translation/messages.json';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { jwtTokens } from '../utils/jwt-helpers';
import * as sharedService from './appService';

const EMAIL_CONFIRM = 'EmailConfirmation';
const PASSWORD_RESET = 'PasswordReset';
dayjs.extend(duration);

export const loginUser = async ({
  email,
  password,
}): Promise<{
  isSuccess: boolean;
  message: string;
  customer?: any;
  destination?: string;
  accessToken?: string;
}> => {
  const customer = await prisma.customer.findUnique({
    where: { email: email },
  });
  const hashPassword = customer!.password;
  const isMatch = await sharedService.isAMatchPassword(
    password,
    hashPassword,
  );
  if (isMatch) {
    // sign a token
    const { accessToken } = jwtTokens(email);
    let destination = 'dashboard',
      message: string = messages['ACT-LOGIN-SUCCESS'],
      isSuccess = true;
    const data = { last_login: Date.now().toString() };
    //save customer to DB
    prisma.customer.update({ where: { email: email }, data });
    return { isSuccess, customer, destination, message, accessToken };
  } else {
    let message = messages['ACT-INVALID-LOGIN'];
    return { isSuccess: false, message };
  }
};

export const createCustomer = async ({
  email,
  password,
  payment_type,
  first_name,
  last_name,
  email_confirm,
  phone_number,
  customer_card,
  customer_address,
  stage,
  id,
}): Promise<{
      isSuccess: boolean;
      message: string;
      customer?: any;
      destination?: string;
    }
  | any
> => {
  try {
    let message = '',
      destination = 'verification';
    if (stage === 1) {
      const exist = await prisma.customer.findUnique({
        where: { email: email },
      });
      if (exist) {
        const message = messages['ACT-EMAIL-EXIST'];
        return { isSuccess: false, message };
      }
      const hashPassword = await sharedService.hashPassword(password);
      const customer = await prisma.customer.create({
        data: {
          email,
          first_name,
          last_name,
          email_confirm,
          phone_number,
          customer_card,
          customer_address,
          payment_type: payment_type.cash,
          password: hashPassword,
        },
      });
      return {
        isSuccess: true,
        message,
        customer: customer,
        destination: 'email confirmation',
      };
    } else if (stage === 2) {
      const customer = await prisma.customer.findUnique({
        where: {
          id: id,
        },
      });
      if (customer?.email_confirm == false) {
        message = messages['USER-NOT-FOUND'];
        return { isSuccess: false, message };
      } else if (customer?.email_confirm == true) {
        await loginUser({ email, password });
        destination = 'dashboard';
        message = messages['ACT-LOGIN-SUCCESS'];
        return {
          isSuccess: true,
          destination,
          message,
          customer: formatCustomerResponse(customer),
        };
      }
      message = messages['WRONG-CONFIRM-CODE'];
      return { isSuccess: false, message, destination };
    }
  } catch (error) {
    console.log(error);
  }
};

function formatCustomerResponse(customer: any) {
  const {
    id,
    email,
    first_name,
    last_name,
    email_confirm,
    payment_type,
    phone_number,
    customer_card,
    customer_address,
  } = customer;

  return {
    id,
    email,
    first_name,
    last_name,
    email_confirm,
    payment_type,
    phone_number,
    customer_card,
    customer_address,
  };
}
export const createAddress = async ({
  number,
  street,
  city,
  state,
  customer_id,
}): Promise<{
  isSuccess: boolean;
  data?: any;
  message?: string;
  error?: any;
}> => {
  try {
    const address = await prisma.address.create({
      data: {
        number,
        street,
        city,
        state,
        customer_id,
      },
    });
    const message = 'Address successfully added';
    return { isSuccess: true, data: address, message };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const softdeleteCustomer = async ({ id, is_delete }) => {
  try {
    const data = await prisma.customer.update({
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

export const getAddresses = async (
  customer_id: string,
): Promise<{ isSuccess: boolean; data?: any } | any> => {
  try {
    const addresses = await prisma.address.findMany({
      where: {
        customer_id: customer_id,
      },
    });
    return { isSuccess: true, data: addresses };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const updateAddress = async ({
  id,
  number,
  street,
  city,
  state,
}): Promise<{ isSuccess: boolean; data?: any; error?: any }> => {
  try {
    const data = await prisma.address.update({
      where: {
        id: id,
      },
      data: {
        number: number,
        street: street,
        city: city,
        state: state,
      },
    });
    return { isSuccess: true, data };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

export const addNotification = async ({
  receiver_id,
  subject,
  content,
  destination,
  is_read,
  receiver_type,
}) => {
  const notification = await prisma.notification.create({
    data: {
      subject,
      content,
      destination,
      is_read,
      receiver_type,
      receiver_id,
    },
  });
  const customer = await prisma.customer.update({
    where: {
      id: notification.receiver_id,
    },
    data: {
      notification_id: notification.id,
    },
  });

  if (notification && customer)
    return { isSuccess: true, data: notification };

  const message = messages['ADD-NOTIFICATION-ERROR'];
  return { isSuccess: false, message };
};

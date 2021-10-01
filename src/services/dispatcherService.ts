import prisma from '../interfaces/client';
import messages from '../translation/messages.json';
// import dayjs from 'dayjs';
// import duration from 'dayjs/plugin/duration';
import * as sharedService from './appService';

// dayjs.extend(duration);

export const loginDispatcher = async ({
  email,
  password,
}): Promise<
  | {
      isSuccess: boolean;
      message: string;
      dispatcher?: any;
      destination?: string;
    }
  | any
> => {
  const dispatcher = await prisma.dispatcher.findUnique({
    where: { email: email },
  });
  if (dispatcher) {
    const hashPassword = dispatcher.password;
    const isMatch = await sharedService.isAMatchPassword(
      password,
      hashPassword,
    );
    if (isMatch) {
      let destination = 'dashboard',
        message: string = messages['ACT-LOGIN-SUCCESS'];
      return { isSuccess: true, dispatcher, destination, message };
    } else {
        let message = "Password or email are incorrect!";
        return { isSuccess: false, message };
    }
  } else {
    let message = messages['ACT-INVALID-LOGIN'];
    return { isSuccess: false, message };
  }
};

export const createDispatcher = async ({
  email,
  password,
  first_name,
  last_name,
  address,
  phone_number,
  stage,
}): Promise<{
  isSuccess: boolean;
  message: string;
  dispatcher?: any;
  destination?: string;
}> => {
  try {
    const exist = await prisma.dispatcher.findUnique({
      where: { email: email },
    });
    if (exist) {
      const message = messages['ACT-EMAIL-EXIST'];
      return { isSuccess: false, message };
    }
    const hashPassword = await sharedService.hashPassword(password);
    const dispatcher = await prisma.dispatcher.create({
      data: {
        email,
        first_name,
        last_name,
        address,
        phone_number,
        password: hashPassword,
      },
    });
    return {
      isSuccess: true,
      destination: 'dashboard',
      message: 'success',
      dispatcher: formatDispatcherResponse(dispatcher),
    };
  } catch (error) {
    let message = messages['WRONG-CONFIRM-CODE'],
      destination = 'home';
    return { isSuccess: false, message, destination };
  }
};

function formatDispatcherResponse(dispatcher: any) {
  const { id, email, first_name, last_name, phone_number, address } =
    dispatcher;

  return {
    id,
    email,
    first_name,
    last_name,
    phone_number,
    address,
  };
}

export const createLocation = async ({
  street,
  city,
  state,
  dispatcher_id,
}): Promise<{
  isSuccess: boolean;
  data?: any;
  message?: string;
  error?: any;
}> => {
  try {
    const location = await prisma.location.create({
      data: {
        street,
        city,
        state,
        dispatcher_id,
      },
    });
    const message = 'Location successfully added';
    return { isSuccess: true, data: location, message };
  } catch (error) {
    return { isSuccess: false, error };
  }
};

// export const softdeletedispatcher = async ({ id, is_delete }) => {
//   try {
//     const data = await prisma.dispatcher.update({
//       where: {
//         id: id,
//       },
//       data: {
//         is_delete: is_delete,
//       },
//     });
//     return { isSuccess: true, data };
//   } catch (error) {
//     return { isSuccess: false, error };
//   }
// };

// export const getAddresses = async (
//   dispatcher_id: string,
// ): Promise<{ isSuccess: boolean; data?: any } | any> => {
//   try {
//     const addresses = await prisma.address.findMany({
//       where: {
//         dispatcher_id: dispatcher_id,
//       },
//     });
//     return { isSuccess: true, data: addresses };
//   } catch (error) {
//     return { isSuccess: false, error };
//   }
// };

// export const updateAddress = async ({
//   id,
//   street,
//   city,
//   state,
// }): Promise<{ isSuccess: boolean; data?: any; error?: any }> => {
//   try {
//     const data = await prisma.address.update({
//       where: {
//         id: id,
//       },
//       data: {
//         street: street,
//         city: city,
//         state: state,
//       },
//     });
//     return { isSuccess: true, data };
//   } catch (error) {
//     return { isSuccess: false, error };
//   }
// };

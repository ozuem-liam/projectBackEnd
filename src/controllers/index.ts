import * as CustomerController from './customerController';
import * as DispatcherController from './dispatcherController';
import * as AdminController from './adminController';

const controllers = {
  customer: CustomerController,
  dispatcher: DispatcherController,
  admin: AdminController,
};

export default controllers;

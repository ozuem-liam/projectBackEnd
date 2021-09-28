import * as CustomerController from './customerController';
import * as DispatcherController from './dispatcherController';
import * as AdminController from './adminController';
import * as TransactionController from './transactionController';

const controllers = {
  customer: CustomerController,
  dispatcher: DispatcherController,
  transaction: TransactionController,
  admin: AdminController,
};

export default controllers;

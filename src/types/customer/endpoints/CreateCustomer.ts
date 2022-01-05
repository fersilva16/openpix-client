import { Customer } from '../Customer';

export type CreateCustomerParameters = {
  name: string;
  email: string;
  phone: string;
  taxID: string;
  correlationID: string;
};

export type CreateCustomerResponse = {
  customer: Customer;
};

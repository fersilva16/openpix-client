import { Customer } from '../customer/Customer';
import { Charge } from '../charge/Charge';
import { PixQrCode } from '../pixQrCode/PixQrCode';

export type Transaction = {
  charge: Charge;
  value: number;
  time: string;
  endToEndID: string;
  transactionID: string;
  infoPagador: string;
  endToEndId: string;
  customer: Customer;
  payer: Customer;
  globalID: any;
  pixQrCode: PixQrCode;
};

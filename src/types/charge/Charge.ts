import { AdditionalInfo } from '../AdditionalInfo';
import { Customer } from '../customer/Customer';

export type ChargeStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED';

export type Charge = {
  value: number;
  customer: Customer;
  comment: string;
  brCode: string;
  status: ChargeStatus;
  correlationID: string;
  paymentLinkID: string;
  paymentLinkUrl: any;
  globalID: any;
  identifier: string;
  qrCodeImage: any;
  additionalInfo: AdditionalInfo[];
  pixKey: string;
  createdAt: string;
  updatedAt: string;
};

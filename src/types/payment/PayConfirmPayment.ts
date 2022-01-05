import { PaymentStatus } from './PaymentStatus';

export type PayConfirmPayment = {
  correlationID: string;
  value: number;
  status: PaymentStatus;
};

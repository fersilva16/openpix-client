import { DestinationAccount } from './DestinationAccount';
import { PaymentStatus } from './PaymentStatus';

export type PaymentPixKey = {
  correlationID: string;
  value: number;
  status: PaymentStatus;
  destination: DestinationAccount;
};

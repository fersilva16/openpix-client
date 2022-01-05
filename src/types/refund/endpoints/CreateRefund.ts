import { Refund } from '../Refund';

export type CreateRefundParameters = {
  value: number;
  transactionEndToEndId: string;
  correlationID: string;
};

export type CreateRefundResponse = {
  refund: Refund;
};

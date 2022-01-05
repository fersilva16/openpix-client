export type RefundStatus = 'IN_PROCESSING' | 'REFUNDED' | 'NOT_ACCOMPLISHED';

export type Refund = {
  value: number;
  status: RefundStatus;
  correlationID: string;
  refundId: string;
  time: string;
};

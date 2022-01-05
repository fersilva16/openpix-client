import { PaymentPixKey } from '../PaymentPixKey';

export type CreatePaymentWithQrCodeParameters = {
  correlationID: string;
  qrcode: string;
  value: number;
};

export type CreatePaymentWithQrCodeResponse = {
  payment: PaymentPixKey;
};

import { PixKeyType } from '../../PixKeyType';
import { PaymentPixKey } from '../PaymentPixKey';

export type CreatePaymentWithPixKeyParameters = {
  correlationID: string;
  pixKey: string;
  pixKeyType: PixKeyType;
  value: number;
};

export type CreatePaymentWithPixKeyResponse = {
  payment: PaymentPixKey;
};

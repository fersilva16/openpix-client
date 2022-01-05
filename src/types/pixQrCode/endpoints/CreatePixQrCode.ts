import { PixQrCode } from '../PixQrCode';

export type CreatePixQrCodeParameters = {
  name: string;
  correlationID: string;
  value: number;
  comment: string;
  identifier: string;
};

export type CreatePixQrCodeResponse = {
  pixQrCode: PixQrCode;
  correlationID: string;
  brCode: string;
};

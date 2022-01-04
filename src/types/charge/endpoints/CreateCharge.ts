import { AdditionalInfo } from '../../AdditionalInfo';
import { Charge } from '../Charge';

export type CreateChargeParameters = {
  correlationID: string;
  value: number;
  comment?: string;
  identifier?: string;
  expiresIn?: number;
  additionalInfo?: AdditionalInfo[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    taxID?: string;
  };
};

export type CreateChargeResponse = {
  charge: Charge;
  correlationID: string;
  brCode: string;
};

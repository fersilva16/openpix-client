import { TaxID } from '../customer/Customer';
import { PixKeyType } from '../PixKeyType';

// export type

export type DestinationAccount = {
  pixKey: string;
  pixKeyType: PixKeyType;

  account: {
    branch: string;
    account: string;
    accountType: string;
  };

  psp: {
    id: string;
    name: string;
    code: string;
  };

  holder: {
    name: string;
    nameFriendly: string;
    taxID: TaxID;
  };
};

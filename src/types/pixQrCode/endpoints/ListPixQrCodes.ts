import { PageInfo } from '../../PageInfo';
import { PixQrCode } from '../PixQrCode';

export type ListPixQrCodesResponse = {
  pixQrCodes: PixQrCode[];
  pageInfo: PageInfo;
};

import { PageInfo } from '../../PageInfo';
import { Charge } from '../Charge';

export type ListChargesParameters = {
  start?: string;
  end?: string;
  status?: string;
};

export type ListChargesResponse = {
  charges: Charge[];
  pageInfo: PageInfo;
};

import { PageInfo } from '../../PageInfo';
import { Refund } from '../Refund';

export type ListRefundsResponse = {
  refunds: Refund[];
  pageInfo: PageInfo;
};

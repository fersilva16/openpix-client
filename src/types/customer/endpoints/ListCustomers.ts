import { PageInfo } from '../../PageInfo';
import { Customer } from '../Customer';

export type ListCustomersResponse = {
  customers: Customer[];
  pageInfo: PageInfo;
};

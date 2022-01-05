import { PageInfo } from '../../PageInfo';
import { Transaction } from '../Transaction';

export type ListTransactionsParameters = {
  start: string;
  end: string;
  charge: string;
  pixQrCode: string;
};

export type ListTransactionsResponse = {
  status: string;
  transactions: Transaction[];
  pageInfo: PageInfo;
};

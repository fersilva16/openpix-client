import { PageInfo } from '../../PageInfo';
import { Webhook } from '../Webhook';

export type ListWebhooksResponse = {
  webhooks: Webhook[];
  pageInfo: PageInfo;
};

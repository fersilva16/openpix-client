import { Webhook } from '../Webhook';

export type CreateWebhookParameters = {
  webhook: {
    name: number;
    url: string;
    authorization: string;
    isActive: boolean;
  };
};

export type CreateWebhookResponse = {
  webhook: Webhook;
};

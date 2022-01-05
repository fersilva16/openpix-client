import axios, { AxiosRequestConfig } from 'axios';

import { OpenPIXError } from './OpenPixError';
import type {
  CreateChargeParameters,
  CreateChargeResponse,
} from './types/charge/endpoints/CreateCharge';
import type { GetChargeResponse } from './types/charge/endpoints/GetCharge';
import type {
  GetQrCodeFromChargeParameters,
  GetQrCodeFromChargeResponse,
} from './types/charge/endpoints/GetQrCodeFromCharge';
import type {
  ListChargesParameters,
  ListChargesResponse,
} from './types/charge/endpoints/ListCharges';
import type {
  CreateRefundParameters,
  CreateRefundResponse,
} from './types/refund/endpoints/CreateRefund';
import type { GetRefundResponse } from './types/refund/endpoints/GetRefund';
import type { ListRefundsResponse } from './types/refund/endpoints/ListRefunds';
import type {
  CreateCustomerParameters,
  CreateCustomerResponse,
} from './types/customer/endpoints/CreateCustomer';
import type { GetCustomerResponse } from './types/customer/endpoints/GetCustomer';
import type { ListCustomersResponse } from './types/customer/endpoints/ListCustomers';
import type { GetTransactionResponse } from './types/transaction/endpoints/GetTransaction';
import type {
  ListTransactionsParameters,
  ListTransactionsResponse,
} from './types/transaction/endpoints/ListTransactions';
import type {
  CreateWebhookParameters,
  CreateWebhookResponse,
} from './types/webhook/endpoints/CreateWebhook';
import type { DeleteWebhookResponse } from './types/webhook/endpoints/DeleteWebhook';
import type { ListWebhooksResponse } from './types/webhook/endpoints/ListWebhooks';

export class OpenPIX {
  constructor(
    private readonly appID: string,
    private readonly baseURL: string = 'https://api.openpix.com.br/api/openpix/v1',
  ) {}

  async getCharge(id: string): Promise<GetChargeResponse> {
    return this.request<GetChargeResponse>(`/charge/${id}`);
  }

  async listCharges(args: ListChargesParameters): Promise<ListChargesResponse> {
    return this.request<ListChargesResponse>('/charge', {
      params: args,
    });
  }

  async createCharge(args: CreateChargeParameters): Promise<CreateChargeResponse> {
    return this.request<CreateChargeResponse>('/charge', {
      method: 'POST',
      data: args,
    });
  }

  async getQrCodeFromCharge({
    id,
    size,
  }: GetQrCodeFromChargeParameters): Promise<GetQrCodeFromChargeResponse> {
    return this.request<GetQrCodeFromChargeResponse>(`/charge/brcode/image/${id}.png`, {
      params: {
        size: size?.toString(),
      },
    });
  }

  async getRefund(id: string): Promise<GetRefundResponse> {
    return this.request<GetRefundResponse>(`/refund/${id}`);
  }

  async listRefunds(): Promise<ListRefundsResponse> {
    return this.request<ListRefundsResponse>('/refund');
  }

  async createRefund(args: CreateRefundParameters): Promise<CreateRefundResponse> {
    return this.request<CreateRefundResponse>('/refund', {
      method: 'POST',
      data: args,
    });
  }

  async getCustomer(id: string): Promise<GetCustomerResponse> {
    return this.request<GetCustomerResponse>(`/customer/${id}`);
  }

  async listCustomers(): Promise<ListCustomersResponse> {
    return this.request<ListCustomersResponse>('/customer');
  }

  async createCustomer(args: CreateCustomerParameters): Promise<CreateCustomerResponse> {
    return this.request<CreateCustomerResponse>('/customer', {
      method: 'POST',
      data: args,
    });
  }

  async getTransaction(id: string): Promise<GetTransactionResponse> {
    return this.request<GetTransactionResponse>(`/transaction/${id}`);
  }

  async listTransactions(args: ListTransactionsParameters): Promise<ListTransactionsResponse> {
    return this.request<ListTransactionsResponse>('/transaction', {
      params: args,
    });
  }

  async listWebhooks(url?: string): Promise<ListWebhooksResponse> {
    return this.request<ListWebhooksResponse>('/webhook', {
      params: {
        url,
      },
    });
  }

  async createWebhook(args: CreateWebhookParameters): Promise<CreateWebhookResponse> {
    return this.request<CreateWebhookResponse>('/webhook', {
      method: 'POST',
      data: args,
    });
  }

  async deleteWebhook(id: string): Promise<DeleteWebhookResponse> {
    return this.request<DeleteWebhookResponse>(`/webhook/${id}`, {
      method: 'DELETE',
    });
  }

  private async request<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return axios({
      baseURL: this.baseURL,
      headers: {
        Authorization: this.appID,
      },
      url: endpoint,
      ...config,
    })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          return Promise.reject(
            new OpenPIXError(error.response.status, error.response.data?.error),
          );
        }

        return Promise.reject(error);
      });
  }
}

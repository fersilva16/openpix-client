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
import type {
  CreatePixQrCodeParameters,
  CreatePixQrCodeResponse,
} from './types/pixQrCode/endpoints/CreatePixQrCode';
import type { GetPixQrCodeResponse } from './types/pixQrCode/endpoints/GetPixQrCode';
import type { ListPixQrCodesResponse } from './types/pixQrCode/endpoints/ListPixQrCodes';
import type { ConfirmPaymentResponse } from './types/payment/endpoints/ConfirmPayment';
import type {
  CreatePaymentWithPixKeyParameters,
  CreatePaymentWithPixKeyResponse,
} from './types/payment/endpoints/CreatePaymentWithPixKey';
import type {
  CreatePaymentWithQrCodeParameters,
  CreatePaymentWithQrCodeResponse,
} from './types/payment/endpoints/CreatePaymentWithQrCode';

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

  async getPixQrCode(id: string): Promise<GetPixQrCodeResponse> {
    return this.request<GetPixQrCodeResponse>(`/pixQrCode-static/${id}`);
  }

  async listPixQrCodes(): Promise<ListPixQrCodesResponse> {
    return this.request<ListPixQrCodesResponse>('/qrcode-static');
  }

  async createPixQrCode(args: CreatePixQrCodeParameters): Promise<CreatePixQrCodeResponse> {
    return this.request<CreatePixQrCodeResponse>('/qrcode-static', {
      method: 'POST',
      data: args,
    });
  }

  async confirmPayment(correlationID: string): Promise<ConfirmPaymentResponse> {
    return this.request<ConfirmPaymentResponse>('/pay/confirm', {
      method: 'POST',
      data: {
        correlationID,
      },
    });
  }

  async createPaymentWithPixKey(
    args: CreatePaymentWithPixKeyParameters,
  ): Promise<CreatePaymentWithPixKeyResponse> {
    return this.request<CreatePaymentWithPixKeyResponse>('/pay/pix-key', {
      method: 'POST',
      data: args,
    });
  }

  async createPaymentWithQrCode(
    args: CreatePaymentWithQrCodeParameters,
  ): Promise<CreatePaymentWithQrCodeResponse> {
    return this.request<CreatePaymentWithQrCodeResponse>('/pay/qrcode', {
      method: 'POST',
      data: args,
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

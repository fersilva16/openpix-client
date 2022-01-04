import axios, { AxiosRequestConfig } from 'axios';

import { OpenPIXError } from './OpenPixError';
import {
  CreateChargeParameters,
  CreateChargeResponse,
} from './types/charge/endpoints/CreateCharge';
import { GetChargeResponse } from './types/charge/endpoints/GetCharge';
import {
  GetQrCodeFromChargeParameters,
  GetQrCodeFromChargeResponse,
} from './types/charge/endpoints/GetQrCodeFromCharge';
import { ListChargesParameters, ListChargesResponse } from './types/charge/endpoints/ListCharges';

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

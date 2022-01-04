import axios, { AxiosRequestConfig } from 'axios';

import { OpenPIXError } from './OpenPixError';

export class OpenPIX {
  constructor(
    private readonly appID: string,
    private readonly baseURL: string = 'https://api.openpix.com.br/api/openpix/v1',
  ) {}

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

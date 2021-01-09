import axios, { AxiosInstance } from 'axios';
import * as _request from 'request';

export const DEFAULT_TIMEOUT = 1000 * 15;

export const request = axios.create({
  timeout: DEFAULT_TIMEOUT,
});

addAxiosInterceptors(request);

export function addAxiosInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

const baseRequest = _request.defaults({
  // 设置默认超时 15s
  timeout: DEFAULT_TIMEOUT,
});

export type RequestOptions = _request.Options;

export const proxyRequest = <T = any>(options: _request.Options): Promise<T> => {
  return new Promise((resolve, reject) => {
    baseRequest(options, (err, _, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

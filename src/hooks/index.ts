import request, { RequestOptionsInit } from 'umi-request';
import { HTTPMethod } from 'http-method-enum';
import useSWR, { ConfigInterface, keyInterface, responseInterface } from 'swr';
import { IDevice } from '@/interfaces';

export const useRequest = (
  url: keyInterface,
  reqOption: RequestOptionsInit,
  config?: ConfigInterface,
): responseInterface<any, Error> => {
  return useSWR(
    url,
    url => {
      if (typeof url === 'string') {
        return request(url, reqOption);
      }
      if (typeof url === 'function') {
        return request(url(), reqOption);
      }
      if (url === null) {
        return;
      }
    },
    config,
  );
};

export const useDevices = (): responseInterface<{ devices: IDevice[] }, Error> => {
  return useRequest(
    [() => `/api/devices`],
    {
      method: HTTPMethod.GET,
    },
    { revalidateOnFocus: false, refreshInterval: 5000 },
  );
};

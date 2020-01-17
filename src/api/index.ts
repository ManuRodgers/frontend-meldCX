import request from 'umi-request';
import store from 'store';
import { message } from 'antd';
import { HTTPMethod } from 'http-method-enum';
import { LoginDto } from '@/dto/login.dto';
import { NotifyDto } from '@/dto/notify.dto';
import { ACCESS_TOKEN } from '@/util/constant';
const BASE = '';

// user login
export const reqLogin = (loginDto: LoginDto) => {
  return request(BASE + `/api/login`, {
    method: HTTPMethod.POST,
    data: loginDto,
    errorHandler: error => {
      console.log(`reqLogin not ok`);
      // const { url, statusText } = error.response;
      // message.error(`The URL: ${url} is ${statusText}`, 2);
      message.error(error.data);
    },
  });
};

// notify

export const reqNotify = (notifyDto: NotifyDto) => {
  console.log(`Bearer ${store.get(ACCESS_TOKEN)}`);
  return request(BASE + `/api/notify`, {
    method: HTTPMethod.POST,
    data: notifyDto,
    errorHandler: error => {
      console.log(`reqNotify not ok`);
      // const { url, statusText } = error.response;
      // message.error(`The URL: ${url} is ${statusText}`, 2);
      message.error(error.data);
    },
    headers: { Authorization: `Bearer ${store.get(ACCESS_TOKEN)}` },
  });
};

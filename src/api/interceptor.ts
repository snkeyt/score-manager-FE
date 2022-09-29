import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

const instant = axios.create({
  baseURL: "http://localhost:3333",
})

instant.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.url?.match(/(auth\/)/g)) {
      config.headers = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      } as AxiosRequestHeaders
    }

    // console.log('config.headers: ', config.headers);
    // console.log('config: ', config);
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

instant.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default instant
import axios from 'axios';
import { Recordable } from 'vite-plugin-mock';
import { HttpService } from './request';
const httpService = new HttpService();
const useRequest = httpService.useRequest;

export const getUserlist = () => {
  return useRequest<any[]>({
    url: '/api/user/list',
    timeout: 10000,
    method: 'get',
  });
};



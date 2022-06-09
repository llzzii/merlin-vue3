import { Recordable } from 'vite-plugin-mock';
import { HttpService } from './request';
const httpService = new HttpService();
const useRequest = httpService.useRequest;

export const getTableData = () => {
  return useRequest<any[]>({
    url: '/basic-api/table/getDemoList',
    timeout: 10000,
    method: 'get',
  });
};

export const getTreeTableData = (params?: Recordable) => {
  return useRequest<any[]>({
    url: '/basic-api/table/getTreeDemoList',
    timeout: 10000,
    method: 'get',
    params,
  });
};

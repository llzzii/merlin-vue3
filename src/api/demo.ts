import axios from 'axios';
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

export const getTreeTableData2 = () => {
  const api = (params?: Recordable) =>
    httpService.instance({
      method: 'get',
      timeout: 10000,
      url: `/basic-api/table/getTreeDemoList2`,
      params,
    });
  return useRequest<any[]>(api);
};

export const getTreeTableData3 = () => {
  const api = (params?: Recordable) =>
    httpService.instance({
      method: 'get',
      timeout: 10000,
      url: `/basic-api/table/getTreeDemoList3`,
      params,
    });
  return useRequest<any[]>(api);
};

import { Menu } from '@/layout/aside/menu/menu';
import { HttpService } from './request';
const httpService = new HttpService();
const useRequest = httpService.useRequest;

export const getMenu = () => {
  return useRequest<Menu[]>({
    url: '/basic-api/system/getMenuList',
    timeout: 1000,
    method: 'get',
  });
};

// export const getMenu = () => {
//   return useRequest(() => {
//     return httpService.instance({
//       url: "/basic-api/system/getMenuList",
//       timeout: 1000,
//       method: "get",
//     });
//   });
// };

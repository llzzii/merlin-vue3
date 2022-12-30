import { httpService } from "@/api/request";

export class UserService{   
      static getUserlist() {            
          const api= (params) =>httpService.instance({
            url: '/api/user/list',
            timeout: 10000,
            method: 'get',
            params
          })     
          return  httpService.usePageRequest<any[]>(api);
      }
      static addUser() {
        const api= (data) =>httpService.instance({
          url: '/api/user/add',
          timeout: 10000,
          method: 'post',
          data:data
        })     
        return  httpService.useRequest<any[]>(api);
      }
}
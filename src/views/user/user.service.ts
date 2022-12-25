import { httpService } from "@/api/request";

export class UserService{   
      static getUserlist() {     
        return  httpService.useRequest<any[]>({
            url: '/api/user/list',
            timeout: 10000,
            method: 'get',
          });
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
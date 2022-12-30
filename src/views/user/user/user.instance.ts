import { PaginationReq } from "@/constrant/baseInterface";

export interface User{
    username: string;
    realname: string;
    sex: number;
    mobile: string;
    email: string;
    remark: string;
    status: number;
    p6d:string;
}
export const userRules = {
    username: [{
        required: true,
        message: "请输入用户名",
        trigger: "change"
    }, {
        pattern: /^[A-Za-z][A-Za-z0-9]{5,16}$/,
        message: "用户名由6-16个字符组成",
        trigger: "change"
    }],
    realname: [{ required: true, message: "请输入正确昵称",max:20 }],
    p6d: [{ required: true, message: "请输入密码" ,max:16,min:4}],
    email: [{ type:'email', message: "请输入正确格式的邮箱" }],
    mobile: [{ type:'number', message: "请输入正确格式的手机号",max:11 }],
}

export class UserListQuery extends PaginationReq{
    realname:string=""
}
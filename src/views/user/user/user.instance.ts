
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
    username: [{ required: true, message: "请输入用户名" }],
    realname: [{ required: true, message: "请输入昵称" }],
    p6d: [{ required: true, message: "请输入密码" }],
    email: [{ type:'email', message: "请输入正确格式的邮箱" }],
    mobile: [{ type:'number', message: "请输入正确格式的手机号",max:11 }],
}
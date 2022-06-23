import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const dashboard = {
  id: '1',
  icon: 'icon-dashboard',
  name: '仪表盘',
  path: '/dashboard',
  children: [],
};
const management = {
  id: '2',
  icon: 'icon-management',
  name: '管理',
  path: '/management',
  children: [
    {
      id: '2-1',
      icon: 'icon-navicon-wzgl',
      name: '文章',
      path: '/manage/document',
      children: [],
    },
  ],
};
const demos = {
  id: '3',
  icon: 'icon-changyongshili',
  name: '示例',
  path: '/vxe-demo',
  children: [
    {
      id: '3-1',
      icon: 'icon-daimashili',
      name: '普通列表',
      path: '/vxe-demo/demo1',
      children: [],
    },
    {
      id: '3-2',
      icon: 'icon-daimashili',
      name: '树列表',
      path: '/vxe-demo/demo2',
      children: [],
    },
    {
      id: '3-3',
      icon: 'icon-daimashili',
      name: '可编辑列表',
      path: '/vxe-demo/demo3',
      children: [],
    },
    {
      id: '3-4',
      icon: 'icon-daimashili',
      name: 'grid表格',
      path: '/vxe-demo/demo4',
      children: [],
    },
    {
      id: '3-7',
      icon: 'icon-daimashili',
      name: 'AntDesignTable',
      path: '/vxe-demo/demo5',
      children: [],
    },
    {
      id: '3-5',
      icon: 'icon-daimashili',
      name: '拖拽',
      path: '/drag/demo1',
      children: [],
    },
    {
      id: '3-6',
      icon: 'icon-daimashili',
      name: '放入',
      path: '/drag/demo2',
      children: [],
    },
    {
      id: '3-7',
      icon: 'icon-daimashili',
      name: '拖拽布局',
      path: '/drag/demo3',
      children: [],
    },
    {
      id: '3-8',
      icon: 'icon-daimashili',
      name: '字体',
      path: '/drag/demo4',
      children: [],
    },
    {
      id: '3-9',
      icon: 'icon-daimashili',
      name: 'MD编辑器',
      path: '/demos/demo1',
      children: [],
    },
  ],
};
const system = {
  id: '4',
  icon: 'icon-xitong',
  name: '系统',
  path: '/management',
  children: [
    {
      id: '4-1',
      icon: 'icon-zuozhe',
      name: '个人设置',
      path: '/manage/document',
      children: [],
    },
  ],
};
const menuList = [dashboard, management, demos, system];
export default [
  {
    url: '/basic-api/system/getMenuList',
    method: 'get',
    response: () => {
      return resultSuccess(menuList);
    },
  },
] as MockMethod[];

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
    {
      id: '2-2',
      icon: 'icon-navicon-wzgl',
      name: 'Linux 命令大全',
      path: '/manage/linux',
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
      icon: 'icon-biaodanzujian-biaoge',
      name: '普通列表',
      path: '/vxe-demo/demo1',
      children: [],
    },
    {
      id: '3-2',
      icon: 'icon-Group-',
      name: '树列表',
      path: '/vxe-demo/demo2',
      children: [],
    },
    {
      id: '3-3',
      icon: 'icon-kebianjibiaoge',
      name: '可编辑列表',
      path: '/vxe-demo/demo3',
      children: [],
    },
    {
      id: '3-4',
      icon: 'icon-kebianjibiaoge',
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
      icon: 'icon-tuozhuai1',
      name: '拖拽',
      path: '/drag/demo1',
      children: [],
    },
    {
      id: '3-6',
      icon: 'icon-tuozhuai1',
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
      icon: 'icon-ziti',
      name: '字体',
      path: '/drag/demo4',
      children: [],
    },
    {
      id: '3-9',
      icon: 'icon-md',
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
  path: '/system',
  children: [
    {
      id: '4-1',
      icon: 'icon-zuozhe',
      name: '个人设置',
      path: '/system/user',
      children: [],
    },
  ],
};

const echarts = {
  id: '5',
  icon: 'icon-tubiao-zhexiantu',
  name: '图表',
  path: '/echarts',
  children: [
    {
      id: '5-1',
      icon: 'icon-tubiao-zhexiantu',
      name: '图表1',
      path: '/echarts/demo1',
      children: [],
    },
    {
      id: '5-2',
      icon: 'icon-kebianjibiaoge',
      name: '大屏',
      path: '/echarts/demo2',
      children: [],
    },
  ],
};
const components = {
  id: '6',
  icon: 'icon-xitong',
  name: '组件',
  path: '/components',
  children: [
    {
      id: '6-0',
      icon: 'icon-shujuhuizong',
      name: '汇总',
      path: '/components/index',
      children: [],
    },
    {
      id: '6-1',
      icon: 'icon-waibiankuang',
      name: '边框',
      path: '/components/borders',
      children: [],
    },
    {
      id: '6-2',
      icon: 'icon-zhuangshi',
      name: '装饰',
      path: '/components/decoration',
      children: [],
    },
    {
      id: '6-3',
      icon: 'icon-timeAxis',
      name: '时间轴',
      path: '/components/lines1',
      children: [],
    },
    {
      id: '6-4',
      icon: 'icon-timeAxis',
      name: '分类轴',
      path: '/components/lines2',
      children: [],
    },
    {
      id: '6-6',
      icon: 'icon-wenjianliebiao',
      name: '文件列表',
      path: '/components/fileList',
      children: [],
    },
    {
      id: '6-7',
      icon: 'icon-canvas',
      name: 'canvas',
      path: '/components/canvas',
      children: [],
    },
    {
      id: '6-7',
      icon: 'icon-canvas',
      name: 'mouseSelection',
      path: '/components/mouseSelection',
      children: [],
    },
  ],
};
const cssDemo = {
  id: '9',
  icon: 'icon-CSS-',
  name: '奇妙的css',
  path: '/css',
  children: [
    {
      id: '9-1',
      icon: 'icon-ziyuan1672',
      name: 'cssDemo',
      path: '/css/demo1',
      children: [],
    },
    {
      id: '9-2',
      icon: 'icon-ziyuan1672',
      name: 'cssDemo2',
      path: '/css/demo2',
      children: [],
    },
  ],
};
const User = {
  id: '10',
  icon: 'icon-CSS-',
  name: '用户管理',
  path: '/user',
  children: [
    {
      id: '10-1',
      icon: 'icon-ziyuan1672',
      name: '用户列表',
      path: '/user/list',
      children: [],
    },
   
  ],
};
const menuList = [dashboard, management, components, demos, echarts, system, cssDemo,User];
export default [
  {
    url: '/basic-api/system/getMenuList',
    method: 'get',
    response: () => {
      return resultSuccess(menuList);
    },
  },
] as MockMethod[];

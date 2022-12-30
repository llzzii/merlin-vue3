import { Recordable } from 'vite-plugin-mock';
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import { defineComponent } from 'vue';
import { RouteMeta, RouteRecordRaw } from 'vue-router';
import { ComponentsDemo } from './modules/components';
import { CssDemo } from './modules/css';
import { OtherDemo } from './modules/demo';
import { DragDemo } from './modules/drag';
import { EchartsDemo } from './modules/echarts';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './modules/error';
import { Management } from './modules/manage';
import { VxeDemo } from './modules/vxeDemo';
import { User } from './modules/user';
export const LAYOUT = () => import('@/layout/index.vue');
// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/*.ts');
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  console.log("🚀 ~ file: index.ts:22 ~ Object.keys ~ mod", mod)
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};
const routers = [
  {
    path: '/',
    name: 'DashboardLAYOUT',
    component: LAYOUT,
    redirect: '/dashboard',
    meta: { hideBreadcrumb: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          affix: true,
          hideBreadcrumb: false,
          hideMenu: false,
          hideTab: false,
        },
      },
    ],
  },
  Management,
  VxeDemo,
  DragDemo,
  OtherDemo,
  CssDemo,
  User,
  EchartsDemo,
  REDIRECT_ROUTE,
  ComponentsDemo,
  PAGE_NOT_FOUND_ROUTE,
  LoginRoute
];

export default routers;

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

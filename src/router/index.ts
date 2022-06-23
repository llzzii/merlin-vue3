import { Recordable } from 'vite-plugin-mock';
import { defineComponent } from 'vue';
import { RouteMeta, RouteRecordRaw } from 'vue-router';
import { OtherDemo } from './modules/demo';
import { DragDemo } from './modules/drag';
import { PAGE_NOT_FOUND_ROUTE } from './modules/error';
import { Management } from './modules/manage';
import { VxeDemo } from './modules/vxeDemo';
export const LAYOUT = () => import('@/layout/index.vue');
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
  PAGE_NOT_FOUND_ROUTE,
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

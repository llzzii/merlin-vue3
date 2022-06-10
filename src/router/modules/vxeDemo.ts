import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const VxeDemo: AppRouteRecordRaw = {
  path: '/vxe-demo',
  name: 'VxeDemo',
  component: LAYOUT,
  meta: {
    title: 'vxe示例',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'demo1',
      name: 'vxeDemo1',
      component: () => import('@/views/vxe-table/demo1/index.vue'),
      meta: {
        title: '普通列表',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo2',
      name: 'vxeDemo2',
      component: () => import('@/views/vxe-table/demo2/index.vue'),
      meta: {
        title: '树列表',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo3',
      name: 'vxeDemo3',
      component: () => import('@/views/vxe-table/demo3/index.vue'),
      meta: {
        title: '可编辑列表',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo4',
      name: 'demo4',
      component: () => import('@/views/vxe-table/demo4/index.vue'),
      meta: {
        title: 'grid表格',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo5',
      name: 'vxeDemo5',
      component: () => import('@/views/vxe-table/demo5/index.vue'),
      meta: {
        title: 'AntDesignTable',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};

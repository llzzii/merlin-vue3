import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const DragDemo: AppRouteRecordRaw = {
  path: '/drag',
  name: 'DragDemo',
  component: LAYOUT,
  meta: {
    title: '拖拽',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'demo1',
      name: 'demo1',
      component: import('@/views/drag/demo/index.vue'),
      meta: {
        title: 'vueUse拖拽',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo2',
      name: 'demo2',
      component: import('@/views/drag/demo2/index.vue'),
      meta: {
        title: 'vueUse放入',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};

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
      name: 'dragDemo1',
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
      name: 'dragDemo2',
      component: import('@/views/drag/demo2/index.vue'),
      meta: {
        title: 'vueUse放入',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo3',
      name: 'dragDemo3',
      component: import('@/views/drag/demo3/index.vue'),
      meta: {
        title: '拖拽布局',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo4',
      name: 'dragDemo4',
      component: import('@/views/cnchar/index.vue'),
      meta: {
        title: '字体',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};

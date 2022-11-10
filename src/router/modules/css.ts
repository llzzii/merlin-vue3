import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const CssDemo: AppRouteRecordRaw = {
  path: '/css',
  name: 'cssDemos',
  component: LAYOUT,
  meta: {
    title: '各种示例',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'demo1',
      name: 'cssDemo1',
      component: ()=>import('@/views/css/index1.vue'),
      meta: {
        title: 'css示例1',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo2',
      name: 'cssDemo2',
      component: ()=>import('@/views/css/index2.vue'),
      meta: {
        title: 'css示例2',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};

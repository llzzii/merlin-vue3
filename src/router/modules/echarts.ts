import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const EchartsDemo: AppRouteRecordRaw = {
  path: '/echarts',
  name: 'OtherDemos',
  component: LAYOUT,
  meta: {
    title: '各种示例',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'demo1',
      name: 'echartDemo',
      component: import('@/views/echarts/demo1/index.vue'),
      meta: {
        title: 'chart示例1',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'demo2',
      name: 'echartDemo1',
      component: import('@/views/echarts/demo2/index.vue'),
      meta: {
        title: 'chart示例2',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};

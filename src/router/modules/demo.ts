import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const OtherDemo: AppRouteRecordRaw = {
  path: '/demos',
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
      name: 'editorDemo',
      component: ()=>import('@/views/editor/index.vue'),
      meta: {
        title: 'md编辑器',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};

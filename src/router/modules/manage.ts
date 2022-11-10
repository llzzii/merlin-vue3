import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const Management: AppRouteRecordRaw = {
  path: '/manage',
  name: 'Management',
  component: LAYOUT,
  meta: {
    title: '管理',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'document',
      name: 'Document',
      component: ()=>import('@/views/management/document/index.vue'),
      meta: {
        title: '文章',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
      children: [
        {
          path: 'detail',
          name: 'detail',
          component: ()=>import('@/views/management/document/detail/index.vue'),
          meta: {
            title: '详情',
            hideBreadcrumb: false,
            hideMenu: true,
            hideTab: true,
            currentActiveMenu: '/manage/document',
          },
        },
      ],
    },
    {
      path: 'linux',
      name: 'linux',
      meta: {
        title: 'linux 命令大全',
      },
      component: ()=>import('@/views/linux/index.vue'),
    },
  ],
};

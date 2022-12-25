import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const User: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: LAYOUT,
  meta: {
    title: '用户管理',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: ()=>import('@/views/user/user/list.vue'),
      meta: {
        title: '用户列表',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    }
  ],
};

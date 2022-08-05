import { AppRouteRecordRaw } from '..';

export const LAYOUT = () => import('@/layout/index.vue');

// 404 on a page
export const ComponentsDemo: AppRouteRecordRaw = {
  path: '/components',
  name: 'componentsDemos',
  component: LAYOUT,
  meta: {
    title: '各种示例',
    hideBreadcrumb: false,
    hideMenu: false,
  },
  children: [
    {
      path: 'index',
      name: 'indexDemo',
      component: import('@/views/components/index.vue'),
      meta: {
        title: '汇总',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'borders',
      name: 'bordersDemo',
      component: import('@/views/components/borders.vue'),
      meta: {
        title: '边框',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'decoration',
      name: 'decorationsDemo',
      component: import('@/views/components/decorations.vue'),
      meta: {
        title: '装饰',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'lines1',
      name: 'lines1Demo',
      component: import('@/views/components/lines/lines1.vue'),
      meta: {
        title: '时间轴',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'lines2',
      name: 'lines2Demo',
      component: import('@/views/components/lines/lines2.vue'),
      meta: {
        title: '分类轴',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
    {
      path: 'fileList',
      name: 'fileList',
      component: import('@/views/components/file-list.vue'),
      meta: {
        title: '文件列表',
        hideBreadcrumb: false,
        hideMenu: false,
        hideTab: false,
      },
    },
  ],
};

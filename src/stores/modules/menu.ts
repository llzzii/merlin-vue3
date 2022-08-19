import { sessionCache } from './../../utils/storageCache';
import { defineStore } from 'pinia';
import _ from 'lodash';
import { Menu } from '@/layout/aside/menu/menu';
import { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router';
import { getRawRoute } from '@/utils';
import { PageEnum } from '@/constrant';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/modules/error';
import { nextTick, toRaw, unref } from 'vue';
import { useRedo } from '@/hooks/useTabs';

interface MenuState {
  // project config
  menuData: Menu[] | undefined;
  cacheTabList: Set<string>;
  tabList: RouteLocationNormalized[];
  lastDragEndIndex: number;
  reloadFlag: boolean;
}
export const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => {
    return {
      menuData: [] as Menu[],
      // Tabs that need to be cached
      cacheTabList: new Set(),
      // multiple tab list
      tabList: sessionCache().get('tabList') || [],
      // Index of the last moved tab
      lastDragEndIndex: 0,
      reloadFlag: true,
    };
  },
  getters: {
    getMenuData(): Menu[] {
      return this.menuData || ([] as Menu[]);
    },
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList);
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex;
    },
  },
  actions: {
    setMenuData(menuData: Menu[] | undefined): void {
      this.menuData = _.merge(this.menuData || [], menuData);
    },
    addTab(route: RouteLocationNormalized): void {
      const { path, name, fullPath, params, query, meta } = getRawRoute(route);
      // 404  The page does not need to add a tab
      if (
        path === PageEnum.ERROR_PAGE ||
        path === PageEnum.BASE_LOGIN ||
        !name ||
        [PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
      ) {
        return;
      }
      let updateIndex = -1;
      // 已存在的 pages, do not add tabs repeatedly
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });
      // If the tab already exists, perform the update operation
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex];
        if (!curTab) {
          return;
        }
        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        this.tabList.splice(updateIndex, 1, curTab);
      } else {
        // Add tab
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel: number = (meta?.dynamicLevel as number) ?? -1;
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? '';
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.tabList.filter((e) => e.meta?.realPath ?? '' === realPath).length >= dynamicLevel
          ) {
            // 关闭第一个
            const index = this.tabList.findIndex((item) => item.meta.realPath === realPath);
            index !== -1 && this.tabList.splice(index, 1);
          }
        }
        this.tabList.push(route);
      }
      this.updateCacheTab();
    },
    updateCacheTab() {
      const cacheMap: Set<string> = new Set();

      for (const tab of this.tabList) {
        const item = getRawRoute(tab);
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) {
          continue;
        }
        const name = item.name as string;
        cacheMap.add(name);
      }
      this.cacheTabList = cacheMap;
      sessionCache().set('tabList', this.tabList);
    },

    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const {
          fullPath,
          meta: { affix },
        } = route;
        if (affix) {
          return;
        }
        const index = this.tabList.findIndex((o) => o.fullPath === fullPath);
        index > -1 && this.tabList.splice(index, 1);
      };
      const { currentRoute, replace } = router;
      const { path } = currentRoute.value;
      if (path !== tab.path) {
        close(tab);
        this.updateCacheTab();

        return;
      }
      let nextTarget: RouteLocationRaw = {};
      const closeIndex = this.tabList.findIndex((o) => o.path === path);
      if (closeIndex === 0) {
        if (this.tabList.length === 0) {
          nextTarget = PageEnum.BASE_HOME;
        } else {
          nextTarget = this.tabList[closeIndex + 1];
        }
      } else {
        nextTarget = this.tabList[closeIndex - 1];
      }
      close(tab);
      this.updateCacheTab();
      await replace(nextTarget);
    },

    async closeTabByKey(key: string, router) {
      const index = this.tabList.findIndex((t) => (t.fullPath || t.path) === key);
      if (index !== -1) {
        await this.closeTab(this.tabList[index], router);
      }
    },
    /**
     * Refresh tabs
     */
    async refreshPage(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      const name = route.name;

      const findTab = this.getCachedTabList.find((item) => item === name);
      console.log('🚀 ~ file: menu.ts ~ line 169 ~ refreshPage ~ findTab', findTab);
      if (findTab) {
        this.cacheTabList.delete(findTab);
      }
      const redo = useRedo(router);
      await redo();
    },
    async reloadPage(duration = 0) {
      this.reloadFlag = false;
      await nextTick();
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true;
        }, duration);
      } else {
        this.reloadFlag = true;
      }
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
      }, 100);
    },
  },
});

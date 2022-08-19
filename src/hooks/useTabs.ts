import { useMenuStore } from '@/stores/modules/menu';
import { unref } from 'vue';
import { Router, useRouter } from 'vue-router';
export const REDIRECT_NAME = 'Redirect';

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};

export const useTabs = (_router?: Router) => {
  const menuStore = useMenuStore();
  const router = _router || useRouter();

  const { currentRoute } = router;
  const getCurrentMenu = () => {
    const route = unref(currentRoute);
    return menuStore.getTabList.find((item) => item.fullPath === route.fullPath)!;
  };
  const refreshPage = async () => {
    await menuStore.refreshPage(router);
  };

  return { getCurrentMenu, refreshPage };
};

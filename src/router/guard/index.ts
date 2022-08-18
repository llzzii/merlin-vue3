import { setRouteChange } from '@/logics/mitt/routeChange';
import { useUserStoreWithOut } from '@/stores/modules/user';
import { Router } from 'vue-router';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const userStore = useUserStoreWithOut();

  const loadedPageMap = new Map<string, boolean>();
  router.beforeEach(async (to, from) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path);
    console.log(
      '🚀 ~ file: index.ts ~ line 21 ~ router.beforeEach ~ userStore.getLockStatus',
      userStore.getLockStatus,
      from,
      to,
    );
    if (userStore.getLockStatus) {
      // next(from);
      userStore.setLockStatus(true);
      // return false;
    }
    // Notify routing changes
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

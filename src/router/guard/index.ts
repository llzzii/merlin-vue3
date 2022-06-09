import { setRouteChange } from "@/logics/mitt/routeChange";
import { Router } from "vue-router";

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();
  console.log(1111);
  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path);
    console.log(2222);

    // Notify routing changes
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

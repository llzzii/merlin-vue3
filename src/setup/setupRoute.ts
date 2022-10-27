import type { App } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routers from '../router';
import { setupRouterGuard } from '@/router/guard';

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: routers,
});

export function setupRoute(app: App<Element>) {
  app.use(router);
  setupRouterGuard(router);
}

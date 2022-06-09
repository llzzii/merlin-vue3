import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routers from "../router";
import { setupRouterGuard } from "@/router/guard";

const router = createRouter({
  history: createWebHistory(""),
  routes: routers,
});

export function setupRoute(app: App<Element>) {
  app.use(router);
  setupRouterGuard(router);
}

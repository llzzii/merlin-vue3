import { store } from "@/stores";
import type { App } from "vue";

export function setupPinia(app: App<Element>) {
  app.use(store);
}

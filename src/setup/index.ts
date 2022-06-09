import type { App } from 'vue';
import { setupAntDesign } from './setupAntdesign';
import { setupGlobalComponents } from './setupGlobalComponents';
import { setupPinia } from './setupPinia';
import { setupRoute } from './setupRoute';
import { setupVxeTable } from './setupVxeTable';

export function setup(app: App<Element>) {
  setupAntDesign(app);
  setupRoute(app);
  setupPinia(app);
  setupVxeTable(app);
  setupGlobalComponents(app);
}

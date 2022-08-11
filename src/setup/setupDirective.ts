import { ContextmenuDirective } from '@/directives/Contextmenu';
import type { App } from 'vue';

export function setupDirective(app: App<Element>) {
  app.directive('contextmenu', ContextmenuDirective);
}

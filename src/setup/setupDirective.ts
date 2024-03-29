import { ContextmenuDirective } from '@/directives/Contextmenu';
import { ElementResizeDirective } from '@/directives/ElementResize';
import { LoadingDirective } from '@/directives/Loading';
import type { App } from 'vue';

export function setupDirective(app: App<Element>) {
  app.directive('contextmenu', ContextmenuDirective);
  app.directive('elementResize', ElementResizeDirective);
  app.directive('loading', LoadingDirective);
}

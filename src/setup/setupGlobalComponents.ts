import { App } from 'vue';
import * as components from '../components';

export function setupGlobalComponents(app: App) {
  // components 目录下含有 isGlobal: true 参数的组件会被注册为全局组件
  Object.keys(components).forEach((key) => {
    const cmpt = components[key];
    if (cmpt?.isGlobal) {
      app.component(cmpt.name, cmpt);
    }
  });
}

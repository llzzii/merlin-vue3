import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import menuList from './data/menu';
import tableList from './data/table';
import treeList from './data/tree';
// const modules = import.meta.globEager('./**/*.ts');

const mockModules: any[] = [...menuList, ...tableList, ...treeList];
// Object.keys(modules).forEach((key) => {
//   if (key.includes('/_')) {
//     return;
//   }
//   mockModules.push(...modules[key].default);
// });

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}

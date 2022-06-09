import { MockMethod, Recordable } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

export const treeList = (keyword) => {
  const result = [] as Recordable[];
  for (let index = 1; index < 5; index++) {
    const children: Recordable[] = [];
    for (let j = 1; j < index; j++) {
      const child: Recordable[] = [];
      for (let k = 0; k < 2 * j; k++) {
        child.push({
          title: `${keyword ?? ''}选项${index}-${j}-${k}`,
          value: `${index}-${j}-${k}`,
          key: `${index}-${j}-${k}`,
          id: `${index}-${j}-${k}`,
          parentId: `${index}-${j}`,
          hasChild: false,
          endTime: '@datetime',
          address: '@city()',
          name: '@cname()',
        });
      }

      children.push({
        title: `${keyword ?? ''}选项${index}-${j}`,
        value: `${index}-${j}`,
        key: `${index}-${j}`,
        id: `${index}-${j}`,
        parentId: `${index}`,
        children: child,
        hasChild: child.length > 0,
        endTime: '@datetime',
        address: '@city()',
        name: '@cname()',
      });
    }
    result.push({
      title: `${keyword ?? ''}选项${index}`,
      value: `${index}`,
      key: `${index}`,
      id: `${index}`,
      parentId: '',
      hasChild: children.length > 0,
      children,
      endTime: '@datetime',
      address: '@city()',
      name: '@cname()',
    });
  }
  return result;
};

export default [
  {
    url: '/basic-api/table/getTreeDemoList',
    method: 'get',
    response: ({ query }) => {
      const { keyword } = query;
      console.log(keyword);
      return resultSuccess(treeList(keyword));
    },
  },
] as MockMethod[];

import { LockModel } from '@/components';
import { createVNode, render } from 'vue';

export const useFullModel = () => {
  let container: HTMLDivElement | null = null;
  const options = {};
  const mountModel = () => {
    if (container) {
      container = null;
    }
    container = document.createElement('div');
    const vm = createVNode(LockModel, options, null);
    render(vm, container);
    document.body.appendChild(container);
  };
  const unMountModel = () => {
    console.log('🚀 ~ file: useFullModel.ts ~ line 18 ~ unMountModel ~ container', container);
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  };
  return { mountModel, unMountModel };
};

import { BorderLine } from '@/components';
import { createVNode, Directive, render, unref } from 'vue';

const CTX_ELEMENTRESIZE_HANDLER = 'CTX_ELEMENTRESIZE_HANDLER';

const elementResizeListener = (el: HTMLElement, binding: DirectiveBinding) => {
  console.log('🚀 ~ file: ElementResize.ts ~ line 7 ~ elementResizeListener ~ binding', binding);
  let container: HTMLDivElement | null = null;
  // 移除并取消相关的事件监听
  const removeContext = () => {
    if (container) {
      unref(el).removeChild(container);
      container = null;
    }
    unref(el).classList.remove('resize-active');
    // document.body.removeEventListener('scroll', removeContextmenu);
    // window.removeEventListener('resize', removeContextmenu);
  };
  const options = {
    elRef: el,
    removeContext,
  };
  container = document.createElement('div');
  container.style.position = 'initial';
  const vm = createVNode(BorderLine, options, null);
  render(vm, container);
  unref(el).appendChild(container);
  console.log('🚀 ~ file: ElementResize.ts ~ line 24 ~ removeContext ~ el', el);
};

export const ElementResizeDirective: Directive = {
  mounted: (el: HTMLElement, binding) => {
    console.log('🚀 ~ file: ElementResize.ts ~ line 31 ~ el', el);
    el[CTX_ELEMENTRESIZE_HANDLER] = () => elementResizeListener(el, binding);
    el.addEventListener('click', el[CTX_ELEMENTRESIZE_HANDLER]);
  },
  unmounted: (el: HTMLElement, binding) => {
    if (el && el[CTX_ELEMENTRESIZE_HANDLER]) {
      el.removeEventListener('click', el[CTX_ELEMENTRESIZE_HANDLER]);
      delete el[CTX_ELEMENTRESIZE_HANDLER];
    }
  },
};

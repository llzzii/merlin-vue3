import { Loading } from '@/components';
import { SizeEnum } from '@/constrant/enums';
import { createVNode, defineComponent, h, reactive, Ref, render, unref, VNode } from 'vue';

export interface LoadingProps {
  tip: string;
  size: SizeEnum;
  absolute: boolean;
  loading: boolean;
  background: string;
  theme: 'dark' | 'light';
}
export interface UseLoadingOptions {
  target?: any;
  props?: Partial<LoadingProps>;
}
export const createLoading = (
  props?: Partial<LoadingProps>,
  target?: HTMLElement,
  wait = false,
) => {
  let vm: Nullable<VNode> = null;
  const data = reactive({
    tip: '',
    loading: true,
    ...props,
  });
  const LoadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data });
    },
  });

  vm = createVNode(LoadingWrap);
  if (wait) {
    setTimeout(() => {
      render(vm, document.createElement('div'));
    }, 0);
  } else {
    render(vm, document.createElement('div'));
  }
  const close = () => {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  };
  const open = (wrap: HTMLElement = document.body) => {
    if (!vm || !vm.el) {
      return;
    }
    wrap.appendChild(vm.el as HTMLElement);
  };
  const setLoading = (loading: boolean) => {
    data.loading = loading;
  };

  const setTip = (tip: string) => {
    data.tip = tip;
  };

  if (target) {
    open(target);
  }
  return {
    close,
    open,
    vm,
    setLoading,
    setTip,
    loading: data.loading,
    $el: vm?.el as HTMLElement,
  };
};

export const useLoading = (opt: Partial<LoadingProps> | Partial<UseLoadingOptions>) => {
  let props: Partial<LoadingProps>;
  let target: HTMLElement | Ref<ElRef> = document.body;

  if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
    const options = opt as Partial<UseLoadingOptions>;
    props = options.props || {};
    target = options.target || document.body;
  } else {
    props = opt as Partial<LoadingProps>;
  }
  const instance = createLoading(props, undefined, true);
  const open = (): void => {
    const t = unref(target as Ref<ElRef>);
    if (!t) return;
    instance.open(t);
  };

  const close = (): void => {
    instance.close();
  };

  const setTip = (tip: string) => {
    instance.setTip(tip);
  };
  return {
    open,
    close,
    setTip,
  };
};

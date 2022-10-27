import { createLoading } from '@/hooks/useLoading';
import { Directive } from 'vue';

let timer: any = null;
/**
 *  <div v-loading.fullscreen="loadingRef" loading-tip="加载中..." loading-background='#fff'  loading-size ='24'></div>
 */
export const LoadingDirective: Directive = {
  mounted: (el, binding) => {
    const tip = el.getAttribute('loading-tip');
    const background = el.getAttribute('loading-background');
    const size = el.getAttribute('loading-size');
    const fullscreen = !!binding.modifiers.fullscreen;
    const instance = createLoading(
      {
        tip,
        background,
        size: size || 'large',
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el,
    );
    el.instance = instance;
    timer = setTimeout(() => {
      el?.instance?.close();
    }, 10000);
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
      clearTimeout(timer);
    }
  },
  unmounted(el) {
    console.log('🚀 ~ file: Loading.ts ~ line 35 ~ unmounted ~ el', el);
    el?.instance?.close();
    clearTimeout(timer);
  },
};

import { createLoading } from '@/hooks/useLoading';
import { Directive } from 'vue';

/**
 *  <div v-loading.fullscreen="loadingRef" loading-tip="加载中..." loading-background='#fff'  loading-size ='24'></div>
 */
export const LoadingDirective: Directive = {
  mounted: (el, binding) => {
    const tip = el.getAttribute('loading-tip');
    const background = el.getAttribute('loading-background');
    const size = el.getAttribute('loading-size');
    const fullscreen = !!binding.modifiers.fullscreen;
    console.log('🚀 ~ file: Loading.ts ~ line 13 ~ binding', binding);
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
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

import { useEventListener } from '@vueuse/core';
import { nextTick, ref, unref } from 'vue';
export const useBBox = (el, options?) => {
  const width = ref(0);
  const height = ref(0);
  const resizeFn = () => {
    width.value = unref(el).clientWidth;
    height.value = unref(el).clientHeight;
  };
  nextTick(() => {
    width.value = unref(el).clientWidth;
    height.value = unref(el).clientHeight;
    useEventListener(window, 'resize', resizeFn);
    console.log('🚀 ~ file: useBBox.ts ~ line 8 ~ nextTick ~ height', height, width);
  });
  return { width, height, resizeFn };
};

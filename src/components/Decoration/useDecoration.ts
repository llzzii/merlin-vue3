import { nextTick, ref, unref } from 'vue';
export const useDecoration = (el, _options?) => {
  const width = ref(0);
  const height = ref(0);
  nextTick(() => {
    width.value = unref(el).clientWidth;
    height.value = unref(el).clientHeight;
    console.log('🚀 ~ file: useBBox.ts ~ line 8 ~ nextTick ~ height', height, width);
  });
  return { width, height };
};

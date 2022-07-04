<template>
  <div class="dv-border-box-6" :ref="'BBox6'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <polygon
        :fill="state.backgroundColor"
        :points="`
        9, 7 ${state.width - 9}, 7 ${state.width - 9}, ${state.height - 7} 9, ${state.height - 7}
      `"
      />

      <circle :fill="mergedColor[1]" cx="5" cy="5" r="2" />
      <circle :fill="mergedColor[1]" :cx="width - 5" cy="5" r="2" />
      <circle :fill="mergedColor[1]" :cx="width - 5" :cy="height - 5" r="2" />
      <circle :fill="mergedColor[1]" cx="5" :cy="height - 5" r="2" />
      <polyline :stroke="mergedColor[0]" :points="`10, 4 ${state.width - 10}, 4`" />
      <polyline
        :stroke="mergedColor[0]"
        :points="`10, ${state.height - 4} ${state.width - 10}, ${state.height - 4}`"
      />
      <polyline :stroke="mergedColor[0]" :points="`5, 70 5, ${state.height - 70}`" />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${state.width - 5}, 70 ${state.width - 5}, ${state.height - 70}`"
      />
      <polyline :stroke="mergedColor[0]" :points="`3, 10, 3, 50`" />
      <polyline :stroke="mergedColor[0]" :points="`7, 30 7, 80`" />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${state.width - 3}, 10 ${state.width - 3}, 50`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${state.width - 7}, 30 ${state.width - 7}, 80`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`3, ${state.height - 10} 3, ${state.height - 50}`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`7, ${state.height - 30} 7, ${state.height - 80}`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${state.width - 3}, ${state.height - 10} ${state.width - 3}, ${
          state.height - 50
        }`"
      />
      <polyline
        :stroke="mergedColor[0]"
        :points="`${state.width - 7}, ${state.height - 30} ${state.width - 7}, ${
          state.height - 80
        }`"
      />
    </svg>
    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, reactive, ref, unref } from 'vue';
  import { formatNumber } from '@/utils/format';
  import { useBBox } from './useBBox';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
    }>(),
    {
      style: () => {
        return {};
      },
      mergedColor: () => ['#282c34', 'rgba(40, 44, 52,0.8)'],
    },
  );
  const BBox6 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox6);
  const state = reactive({
    width: formatNumber(props?.style?.width, unref(width)),
    height: formatNumber(props?.style?.height, unref(height)),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
  });
  nextTick(() => {
    state.width = formatNumber(props?.style?.width, unref(width));
    state.height = formatNumber(props?.style?.height, unref(height));
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

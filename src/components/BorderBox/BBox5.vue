<template>
  <div class="dv-border-box-5" :ref="'BBox5'" :style="style">
    <svg
      :class="`dv-border-svg-container  ${reverse && 'dv-reverse'}`"
      :width="state.width"
      :height="state.height"
    >
      <polygon
        :fill="state.backgroundColor"
        :points="`
        10, 22 ${state.width - 22}, 22 ${state.width - 22}, ${state.height - 86} ${
          state.width - 84
        }, ${state.height - 24} 10, ${state.height - 24}
      `"
      />

      <polyline
        class="dv-bb5-line-1"
        :stroke="mergedColor[0]"
        :points="`8, 5 ${state.width - 5}, 5 ${state.width - 5}, ${state.height - 100}
          ${state.width - 100}, ${state.height - 5} 8, ${state.height - 5} 8, 5`"
      />
      <polyline
        class="dv-bb5-line-2"
        :stroke="mergedColor[1]"
        :points="`3, 5 ${state.width - 20}, 5 ${state.width - 20}, ${state.height - 60}
          ${state.width - 74}, ${state.height - 5} 3, ${state.height - 5} 3, 5`"
      />
      <polyline
        class="dv-bb5-line-3"
        :stroke="mergedColor[1]"
        :points="`50, 13 ${state.width - 35}, 13`"
      />
      <polyline
        class="dv-bb5-line-4"
        :stroke="mergedColor[1]"
        :points="`15, 20 ${state.width - 35}, 20`"
      />
      <polyline
        class="dv-bb5-line-5"
        :stroke="mergedColor[1]"
        :points="`15, ${state.height - 20} ${state.width - 110}, ${state.height - 20}`"
      />
      <polyline
        class="dv-bb5-line-6"
        :stroke="mergedColor[1]"
        :points="`15, ${state.height - 13} ${state.width - 110}, ${state.height - 13}`"
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
      reverse?: boolean;
    }>(),
    {
      style: () => {
        return {};
      },
      mergedColor: () => ['#282c34', 'rgba(40, 44, 52,0.8)'],
      reverse: false,
    },
  );
  const BBox5 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox5);
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

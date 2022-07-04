<template>
  <div class="dv-border-box-13" :ref="'BBox13'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <path
        :fill="state.backgroundColor"
        :stroke="mergedColor[0]"
        :d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${state.width - 20} 10 L ${state.width - 5} 25
          L ${state.width - 5} ${state.height - 5} L 20 ${state.height - 5}
          L 5 ${state.height - 20} L 5 20
        `"
      />

      <path
        fill="transparent"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="10, 5"
        :stroke="mergedColor[0]"
        :d="`M 16 9 L 61 9`"
      />

      <path
        fill="transparent"
        :stroke="mergedColor[1]"
        :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
      />

      <path
        fill="transparent"
        :stroke="mergedColor[1]"
        :d="`M ${state.width - 5} ${state.height - 30} L ${state.width - 5} ${state.height - 5} L ${
          state.width - 30
        } ${height - 5}`"
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
      mergedColor: () => ['#235fa7', '#4fd2dd'],
      style: () => {
        return {};
      },
    },
  );
  const BBox13 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox13);
  const state = reactive({
    width: formatNumber(props?.style?.width, unref(width)),
    height: formatNumber(props?.style?.height, unref(height)),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
    filterId: 'border-box-11-filterId-12',
  });

  nextTick(() => {
    state.width = formatNumber(props?.style?.width, unref(width));
    state.height = formatNumber(props?.style?.height, unref(height));
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

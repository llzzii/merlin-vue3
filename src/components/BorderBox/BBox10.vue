<template>
  <div
    class="dv-border-box-10"
    :ref="'BBox10'"
    style="box-shadow: inset 0 0 25px 3px #1d48c4"
    :style="style"
  >
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="state.backgroundColor"
        :points="`
        4, 0 ${state.width - 4}, 0 ${state.width}, 4 ${state.width}, ${state.height - 4} ${
          state.width - 4
        }, ${state.height}
        4, ${state.height} 0, ${state.height - 4} 0, 4
      `"
      />
    </svg>

    <svg
      :width="borderWidth + 'px'"
      :height="borderHeight + 'px'"
      :key="item"
      v-for="item in border"
      :class="`${item} dv-border-svg-container`"
    >
      <polygon :fill="mergedColor[1]" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
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
      border?: Array<string>;
      borderWidth?: number;
      borderHeight?: number;
    }>(),
    {
      mergedColor: () => ['#1d48c4', '#d3e1f8'],
      style: () => {
        return {};
      },
      border: () => ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
      borderWidth: 150,
      borderHeight: 150,
    },
  );
  const BBox10 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox10);
  const state = reactive({
    width: formatNumber(props?.style?.width, unref(width)),
    height: formatNumber(props?.style?.height, unref(height)),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
    path: 'border-box-8-path-12',
    gradient: 'border-box-8-gradient-12',
    mask: 'border-box-8-mask-12',
  });

  nextTick(() => {
    state.width = formatNumber(props?.style?.width, unref(width));
    state.height = formatNumber(props?.style?.height, unref(height));
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

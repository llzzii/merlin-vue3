<template>
  <div class="dv-border-box-1" :ref="'BBox1'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <polygon
        :fill="state.backgroundColor"
        :points="`
        7, 7 ${state.width - 7}, 7 ${state.width - 7}, ${state.height - 7} 7, ${state.height - 7}
      `"
      />

      <polyline
        :stroke="mergedColor[0]"
        :points="`2, 2 ${state.width - 2} ,2 ${state.width - 2}, ${state.height - 2} 2, ${
          state.height - 2
        } 2, 2`"
      />
      <polyline
        :stroke="mergedColor[1]"
        :points="`6, 6 ${state.width - 6}, 6 ${state.width - 6}, ${state.height - 6} 6, ${
          state.height - 6
        } 6, 6`"
      />
      <circle :fill="mergedColor[0]" cx="11" cy="11" r="1" />
      <circle :fill="mergedColor[0]" :cx="state.width - 11" cy="11" r="1" />
      <circle :fill="mergedColor[0]" :cx="state.width - 11" :cy="state.height - 11" r="1" />
      <circle :fill="mergedColor[0]" cx="11" :cy="state.height - 11" r="1" />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, reactive } from 'vue';
  import { formatNumber } from '@/utils/format';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
    }>(),
    {
      style: () => {
        return {};
      },
      mergedColor: () => ['#fff', 'rgba(255, 255, 255, 0.6)'],
    },
  );
  const state = reactive({
    width: formatNumber(props?.style?.width, 120),
    height: formatNumber(props?.style?.height, 40),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

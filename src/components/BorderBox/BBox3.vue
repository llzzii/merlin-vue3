<template>
  <div class="dv-border-box-3" :ref="'BBox3'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <polygon
        :fill="state.backgroundColor"
        :points="`
        23, 23 ${state.width - 24}, 23 ${state.width - 24}, ${state.height - 24} 23, ${
          state.height - 24
        }
      `"
      />

      <polyline
        class="dv-bb3-line1"
        :stroke="mergedColor[0]"
        :points="`4, 4 ${state.width - 22} ,4 ${state.width - 22}, ${state.height - 22} 4, ${
          state.height - 22
        } 4, 4`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="mergedColor[1]"
        :points="`10, 10 ${state.width - 16}, 10 ${state.width - 16}, ${state.height - 16} 10, ${
          state.height - 16
        } 10, 10`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="mergedColor[1]"
        :points="`16, 16 ${state.width - 10}, 16 ${state.width - 10}, ${state.height - 10} 16, ${
          state.height - 10
        } 16, 16`"
      />
      <polyline
        class="dv-bb3-line2"
        :stroke="mergedColor[1]"
        :points="`22, 22 ${state.width - 4}, 22 ${state.width - 4}, ${state.height - 4} 22, ${
          state.height - 4
        } 22, 22`"
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
      border?: Array<string>;
      borderWidth?: number;
      borderHeight?: number;
    }>(),
    {
      style: () => {
        return {};
      },
      mergedColor: () => ['#2862b7', '#2862b7'],
      borderWidth: 150,
      borderHeight: 150,
    },
  );
  const BBox3 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox3);
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

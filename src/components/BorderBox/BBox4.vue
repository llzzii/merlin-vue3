<template>
  <div class="dv-border-box-4" :ref="'BBox4'" :style="style">
    <svg
      :class="`dv-border-svg-container ${reverse && 'dv-reverse'}`"
      :width="state.width"
      :height="state.height"
    >
      <polygon
        :fill="state.backgroundColor"
        :points="`
        ${state.width - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
        16, 42 16, ${state.height - 32} 41, ${state.height - 7} ${state.width - 15}, ${
          state.height - 7
        }
      `"
      />

      <polyline
        class="dv-bb4-line-1"
        :stroke="mergedColor[0]"
        :points="`145, ${state.height - 5} 40, ${state.height - 5} 10, ${state.height - 35}
          10, 40 40, 5 150, 5 170, 20 ${state.width - 15}, 20`"
      />
      <polyline
        :stroke="mergedColor[1]"
        class="dv-bb4-line-2"
        :points="`245, ${state.height - 1} 36, ${state.height - 1} 14, ${state.height - 23}
          14, ${state.height - 100}`"
      />

      <polyline
        class="dv-bb4-line-3"
        :stroke="mergedColor[0]"
        :points="`7, ${state.height - 40} 7, ${state.height - 75}`"
      />
      <polyline class="dv-bb4-line-4" :stroke="mergedColor[0]" :points="`28, 24 13, 41 13, 64`" />
      <polyline class="dv-bb4-line-5" :stroke="mergedColor[0]" :points="`5, 45 5, 140`" />
      <polyline class="dv-bb4-line-6" :stroke="mergedColor[1]" :points="`14, 75 14, 180`" />
      <polyline
        class="dv-bb4-line-7"
        :stroke="mergedColor[1]"
        :points="`55, 11 147, 11 167, 26 250, 26`"
      />
      <polyline class="dv-bb4-line-8" :stroke="mergedColor[1]" :points="`158, 5 173, 16`" />
      <polyline
        class="dv-bb4-line-9"
        :stroke="mergedColor[0]"
        :points="`200, 17 ${state.width - 10}, 17`"
      />
      <polyline
        class="dv-bb4-line-10"
        :stroke="mergedColor[1]"
        :points="`385, 17 ${state.width - 10}, 17`"
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
      mergedColor: () => ['red', 'rgba(0,0,255,0.8)'],
      reverse: false,
    },
  );
  const BBox4 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox4);
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

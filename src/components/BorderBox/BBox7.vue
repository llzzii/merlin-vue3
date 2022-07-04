<template>
  <div class="dv-border-box-7" :ref="'BBox7'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <polyline class="dv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, 25 0, 0 25, 0`" />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`${state.width - 25}, 0 ${state.width}, 0 ${state.width}, 25`"
      />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`${state.width - 25}, ${state.height} ${state.width}, ${state.height} ${
          state.width
        }, ${state.height - 25}`"
      />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`0, ${state.height - 25} 0, ${state.height} 25, ${state.height}`"
      />

      <polyline class="dv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, 10 0, 0 10, 0`" />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`${state.width - 10}, 0 ${state.width}, 0 ${state.width}, 10`"
      />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`${state.width - 10}, ${state.height} ${state.width}, ${state.height} ${
          state.width
        }, ${state.height - 10}`"
      />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`0, ${state.height - 10} 0, ${state.height} 10, ${state.height}`"
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
      mergedColor: () => ['#282c34', 'rgba(40, 44, 52,0.8)'],
      style: () => {
        return {
          boxShadow: `inset 0 0 40px #282c34`,
          border: `1px solid #282c34`,
          backgroundColor: 'transparent',
        };
      },
    },
  );
  const BBox7 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox7);
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

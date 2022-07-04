<template>
  <div class="dv-decoration-2" :ref="'Decoration2'" :style="style">
    <svg :width="`${width}px`" :height="`${height}px`">
      <rect :x="x" :y="y" :width="w" :height="h" :fill="mergedColor[0]">
        <animate
          :attributeName="reverse ? 'height' : 'width'"
          from="0"
          :to="reverse ? height : width"
          :dur="`${dur}s`"
          calcMode="spline"
          keyTimes="0;1"
          keySplines=".42,0,.58,1"
          repeatCount="indefinite"
        />
      </rect>

      <rect :x="x" :y="y" width="1" height="1" :fill="mergedColor[1]">
        <animate
          :attributeName="reverse ? 'y' : 'x'"
          from="0"
          :to="reverse ? height : width"
          :dur="`${dur}s`"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.42,0,0.58,1"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, onMounted, reactive, ref, toRefs, unref } from 'vue';
  import { useDecoration } from './useDecoration';
  import { formatNumber } from '@/utils/format';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
      reverse?: boolean;
      dur?: number;
    }>(),
    {
      mergedColor: () => ['#fff', '#0de7c2'],
      style: () => {
        return {};
      },
      reverse: false,
      dur: 6,
    },
  );
  const Decoration2 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration2);
  const state = reactive<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });
  const { x, y, w, h } = toRefs(state);
  const calcSVGData = () => {
    if (props.reverse) {
      w.value = 1;
      h.value = unref(height);
      x.value = unref(width) / 2;
      y.value = 0;
    } else {
      w.value = unref(width);
      h.value = 1;
      x.value = 0;
      y.value = unref(height) / 2;
    }
  };
  nextTick(() => {
    width.value = formatNumber(props?.style?.width, unref(width));
    height.value = formatNumber(props?.style?.height, unref(height));
    calcSVGData();
  });
  onMounted(() => {});
</script>

<style lang="less" scoped>
  @import './decoration.less';
</style>

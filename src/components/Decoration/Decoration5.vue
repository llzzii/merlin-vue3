<template>
  <div class="dv-decoration-5" :ref="'Decoration5'" :style="style">
    <svg :width="width" :height="height">
      <polyline fill="transparent" :stroke="mergedColor[0]" stroke-width="3" :points="line1Points">
        <animate
          attributeName="stroke-dasharray"
          attributeType="XML"
          :from="`0, ${line1Length / 2}, 0, ${line1Length / 2}`"
          :to="`0, 0, ${line1Length}, 0`"
          :dur="`${dur}s`"
          begin="0s"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.4,1,0.49,0.98"
          repeatCount="indefinite"
        />
      </polyline>
      <polyline fill="transparent" :stroke="mergedColor[1]" stroke-width="2" :points="line2Points">
        <animate
          attributeName="stroke-dasharray"
          attributeType="XML"
          :from="`0, ${line2Length / 2}, 0, ${line2Length / 2}`"
          :to="`0, 0, ${line2Length}, 0`"
          :dur="`${dur}s`"
          begin="0s"
          calcMode="spline"
          keyTimes="0;1"
          keySplines=".4,1,.49,.98"
          repeatCount="indefinite"
        />
      </polyline>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, onMounted, reactive, ref, toRefs, unref } from 'vue';
  import { useDecoration } from './useDecoration';
  import { formatNumber } from '@/utils/format';
  import { getPolylineLength } from './utils';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
      reverse?: boolean;
      dur?: number;
    }>(),
    {
      mergedColor: () => ['#3f96a5', '#3f96a5'],
      style: () => {
        return {};
      },
      reverse: false,
      dur: 1.2,
    },
  );
  const Decoration5 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration5);
  const state = reactive<{
    line1Points: string;
    line2Points: string;
    line2Length: number;
    line1Length: number;
  }>({
    line1Points: '',
    line2Points: '',

    line1Length: 0,
    line2Length: 0,
  });
  const { line1Points, line2Length, line1Length, line2Points } = toRefs(state);
  const calcSVGData = () => {
    let line1PointsTem = [
      [0, unref(height) * 0.2],
      [unref(width) * 0.18, unref(height) * 0.2],
      [unref(width) * 0.2, unref(height) * 0.4],
      [unref(width) * 0.25, unref(height) * 0.4],
      [unref(width) * 0.27, unref(height) * 0.6],
      [unref(width) * 0.72, unref(height) * 0.6],
      [unref(width) * 0.75, unref(height) * 0.4],
      [unref(width) * 0.8, unref(height) * 0.4],
      [unref(width) * 0.82, unref(height) * 0.2],
      [unref(width), unref(height) * 0.2],
    ];

    let line2PointsTem = [
      [unref(width) * 0.3, unref(height) * 0.8],
      [unref(width) * 0.7, unref(height) * 0.8],
    ];

    const line1LengthTem = getPolylineLength(line1PointsTem);
    const line2LengthTem = getPolylineLength(line2PointsTem);

    // line1PointsTem = line1PointsTem.map((point) => point.join(',')).join(' ');
    // line2PointsTem = line2PointsTem.map((point) => point.join(',')).join(' ');

    line1Points.value = line1PointsTem.map((point) => point.join(',')).join(' ');
    line2Points.value = line2PointsTem.map((point) => point.join(',')).join(' ');

    line1Length.value = line1LengthTem;
    line2Length.value = line2LengthTem;
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

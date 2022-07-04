<template>
  <div class="dv-decoration-6" :ref="'Decoration6'" :style="style">
    <svg
      :width="`${svgWH[0]}px`"
      :height="`${svgWH[1]}px`"
      :style="`transform:scale(${svgScale[0]},${svgScale[1]});`"
    >
      <template v-for="(point, i) in points" :key="i">
        <rect
          :fill="mergedColor[Math.random() > 0.5 ? 0 : 1]"
          :x="point[0] - halfRectWidth"
          :y="point[1] - heights[i] / 2"
          :width="rectWidth"
          :height="heights[i]"
        >
          <animate
            attributeName="y"
            :values="`${point[1] - minHeights[i] / 2};${point[1] - heights[i] / 2};${
              point[1] - minHeights[i] / 2
            }`"
            :dur="`${randoms[i]}s`"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            :values="`${minHeights[i]};${heights[i]};${minHeights[i]}`"
            :dur="`${randoms[i]}s`"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </template>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, onMounted, reactive, ref, toRefs, unref } from 'vue';
  import { useDecoration } from './useDecoration';
  import { formatNumber } from '@/utils/format';
  import { randomExtend } from './utils';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
      reverse?: boolean;
      dur?: number;
    }>(),
    {
      mergedColor: () => ['#7acaec', '#7acaec'],
      style: () => {
        return {};
      },
      reverse: false,
      dur: 6,
    },
  );
  const Decoration6 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration6);
  const state = reactive<{
    svgWH: number[];
    svgScale: number[];
    rowNum: number;
    rowPoints: number;
    rectWidth: number;
    halfRectWidth: number;
    points: any[];
    heights: any[];
    minHeights: any[];
    randoms: any[];
  }>({
    svgWH: [300, 35],
    svgScale: [1, 1],
    rowNum: 1,
    rowPoints: 40,
    rectWidth: 7,
    halfRectWidth: 7 / 2,
    points: [],
    heights: [],
    minHeights: [],
    randoms: [],
  });
  const {
    svgWH,
    svgScale,
    rowNum,
    rowPoints,
    rectWidth,
    halfRectWidth,
    points,
    heights,
    minHeights,
    randoms,
  } = toRefs(state);
  const calcSVGData = () => {
    calcPointsPosition();

    calcScale();
  };
  const calcPointsPosition = () => {
    const [w, h] = unref(svgWH);

    const horizontalGap = w / (unref(rowPoints) + 1);
    const verticalGap = h / (unref(rowNum) + 1);

    let point = new Array(unref(rowNum))
      .fill(0)
      .map((_foo, i) =>
        new Array(unref(rowPoints))
          .fill(0)
          .map((_foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)]),
      );

    points.value = point.reduce((all, item) => [...all, ...item], []);
    heights.value = new Array(unref(rowNum) * unref(rowPoints))
      .fill(0)
      .map((_foo) =>
        Math.random() > 0.8 ? randomExtend(0.7 * h, h) : randomExtend(0.2 * h, 0.5 * h),
      );

    minHeights.value = new Array(unref(rowNum) * unref(rowPoints))
      .fill(0)
      .map((_foo, i) => unref(heights)[i] * Math.random());

    randoms.value = new Array(unref(rowNum) * unref(rowPoints))
      .fill(0)
      .map((_foo) => Math.random() + 1.5);
  };

  const calcScale = () => {
    const [w, h] = unref(svgWH);

    svgScale.value = [unref(width) / w, unref(height) / h];
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

<template>
  <div class="dv-decoration-1" :ref="'Decoration1'" :style="style">
    <svg
      :width="`${svgWH[0]}px`"
      :height="`${svgWH[1]}px`"
      :style="`transform:scale(${svgScale[0]},${svgScale[1]});`"
    >
      <template v-for="(point, i) in points">
        <rect
          v-if="Math.random() > 0.6"
          :key="i"
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
          <animate
            v-if="Math.random() > 0.6"
            attributeName="fill"
            :values="`${mergedColor[0]};transparent`"
            dur="1s"
            :begin="Math.random() * 2"
            repeatCount="indefinite"
          />
        </rect>
      </template>

      <rect
        v-if="rects[0]"
        :fill="mergedColor[1]"
        :x="rects[0][0] - pointSideLength"
        :y="rects[0][1] - pointSideLength"
        :width="pointSideLength * 2"
        :height="pointSideLength * 2"
      >
        <animate
          attributeName="width"
          :values="`0;${pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          :values="`0;${pointSideLength * 2}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x"
          :values="`${rects[0][0]};${rects[0][0] - pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          :values="`${rects[0][1]};${rects[0][1] - pointSideLength}`"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      <rect
        v-if="rects[1]"
        :fill="mergedColor[1]"
        :x="rects[1][0] - 40"
        :y="rects[1][1] - pointSideLength"
        :width="40"
        :height="pointSideLength * 2"
      >
        <animate attributeName="width" values="0;40;0" dur="2s" repeatCount="indefinite" />
        <animate
          attributeName="x"
          :values="`${rects[1][0]};${rects[1][0] - 40};${rects[1][0]}`"
          dur="2s"
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
    }>(),
    {
      mergedColor: () => ['#fff', '#0de7c2'],
      style: () => {
        return {};
      },
    },
  );
  const Decoration1 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration1);
  const state = reactive<{
    points: any[];
    rects: number[];
    svgWH: number[];
    svgScale: number[];
    rowNum: number;
    rowPoints: number;
    pointSideLength: number;
    halfPointSideLength: number;
  }>({
    svgWH: [200, 50],
    svgScale: [1, 1],
    rowNum: 4,
    rowPoints: 20,
    pointSideLength: 2.5,
    halfPointSideLength: 2.5 / 2,
    points: [],
    rects: [],
  });
  const {
    svgWH,
    svgScale,
    rowNum,
    rowPoints,
    pointSideLength,
    halfPointSideLength,
    points,
    rects,
  } = toRefs(state);
  const calcSVGData = () => {
    calcPointsPosition();

    calcRectsPosition();

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
    console.log(points);
  };
  const calcRectsPosition = () => {
    const rect1 = points.value[unref(rowPoints) * 2 - 1];
    const rect2 = points.value[unref(rowPoints) * 2 - 3];

    rects.value = [rect1, rect2];
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

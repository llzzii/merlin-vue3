<template>
  <div class="dv-decoration-3" :ref="'Decoration3'" :style="style">
    <svg
      :width="`${svgWH[0]}px`"
      :height="`${svgWH[1]}px`"
      :style="`transform:scale(${svgScale[0]},${svgScale[1]});`"
    >
      <template v-for="(point, _i) in points" :key="_i">
        <rect
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
          <animate
            v-if="Math.random() > 0.6"
            attributeName="fill"
            :values="`${mergedColor.join(';')}`"
            :dur="Math.random() + 1 + 's'"
            :begin="Math.random() * 2"
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

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
    }>(),
    {
      mergedColor: () => ['#7acaec', 'transparent'],
      style: () => {
        return {};
      },
    },
  );
  const Decoration3 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration3);
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
    svgWH: [300, 35],
    svgScale: [1, 1],
    rowNum: 2,
    rowPoints: 25,
    pointSideLength: 7,
    halfPointSideLength: 7 / 2,
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

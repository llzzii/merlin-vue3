<template>
  <div class="dv-decoration-11" :ref="'Decoration11'" :style="style">
    <svg :width="width" :height="height">
      <defs>
        <g :id="gId">
          <path
            :stroke="pathColor[i]"
            :stroke-width="width / 2"
            fill="transparent"
            v-for="(d, i) in pathD"
            :key="d"
            :d="d"
          />
        </g>

        <radialGradient :id="gradientId" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="transparent" stop-opacity="1" />
          <stop
            offset="100%"
            :stop-color="fade(mergedColor[1] || defaultColor[1], 30)"
            stop-opacity="1"
          />
        </radialGradient>
      </defs>

      <circle
        v-for="r in circleR"
        :key="r"
        :r="r"
        :cx="x"
        :cy="y"
        :stroke="mergedColor[1]"
        :stroke-width="0.5"
        fill="transparent"
      />

      <circle r="1" :cx="x" :cy="y" stroke="transparent" :fill="`url(#${gradientId})`">
        <animate
          attributeName="r"
          :values="`1;${width / 2}`"
          :dur="`${haloDur}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0"
          :dur="`${haloDur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle r="2" :cx="x" :cy="y" :fill="mergedColor[1]" />

      <g v-if="showSplitLine">
        <polyline
          v-for="p in splitLinePoints"
          :key="p"
          :points="p"
          :stroke="mergedColor[1]"
          :stroke-width="0.5"
          opacity="0.5"
        />
      </g>

      <path
        v-for="d in arcD"
        :key="d"
        :d="d"
        :stroke="mergedColor[1]"
        stroke-width="2"
        fill="transparent"
      />

      <use :xlink:href="`#${gId}`">
        <animateTransform
          attributeName="transform"
          type="rotate"
          :values="`0, ${x} ${y};360, ${x} ${y}`"
          :dur="`${scanDur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>

    <div class="decoration-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, onMounted, ref, unref, reactive, toRefs } from 'vue';
  import { useDecoration } from './useDecoration';
  import { formatNumber } from '@/utils/format';
  import { fade } from '../BorderBox/colors';
  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
      reverse?: boolean;
      scanDur?: number;
      haloDur?: number;
    }>(),
    {
      mergedColor: () => ['#2783ce', '#2cf7fe'],
      style: () => {
        return {};
      },
      reverse: false,
      scanDur: 3,
      haloDur: 2,
    },
  );
  const Decoration11 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration11);
  const state = reactive<{
    gId: string;
    gradientId: string;
    pathD: any[];
    pathColor: any[];
    circleR: any[];
    splitLinePoints: any[];
    arcD: any[];
    segment: number;
    sectorAngle: number;
    ringNum: number;
    ringWidth: number;
    x: number;
    y: number;
    showSplitLine: boolean;
  }>({
    gId: `decoration-11-g-12`,
    gradientId: `decoration-11-gradient-12`,

    pathD: [],

    pathColor: [],

    circleR: [],

    splitLinePoints: [],

    arcD: [],

    segment: 30,

    sectorAngle: Math.PI / 3,

    ringNum: 3,

    ringWidth: 1,

    showSplitLine: true,
    x: 0,
    y: 0,
  });
  const {
    gId,
    gradientId,
    pathD,
    pathColor,
    circleR,
    splitLinePoints,
    arcD,
    segment,
    sectorAngle,
    ringNum,
    ringWidth,
    showSplitLine,
    x,
    y,
  } = toRefs(state);
  nextTick(() => {
    width.value = formatNumber(props?.style?.width, unref(width));
    height.value = formatNumber(props?.style?.height, unref(height));
    x.value = width.value / 2;
    y.value = height.value / 2;
    init();
  });
  const init = () => {
    calcPathD();

    calcPathColor();

    calcCircleR();

    calcSplitLinePoints();

    calcArcD();
  };

  const calcPathD = () => {
    const startAngle = -Math.PI / 2;
    const angleGap = sectorAngle.value / segment.value;
    const r = width.value / 4;
    let lastEndPoints = getCircleRadianPoint(x.value, y.value, r, startAngle);

    pathD.value = new Array(segment.value).fill('').map((_, i) => {
      const endPoints = getCircleRadianPoint(
        x.value,
        y.value,
        r,
        startAngle - (i + 1) * angleGap,
      ).map((_) => _.toFixed(5));
      const d = `M${lastEndPoints.join(',')} A${r}, ${r} 0 0 0 ${endPoints.join(',')}`;
      lastEndPoints = endPoints;

      return d;
    });
  };
  const calcPathColor = () => {
    const colorGap = 100 / (segment.value - 1);

    pathColor.value = new Array(segment.value)
      .fill(props.mergedColor)
      .map((_, i) => fade(props.mergedColor[0], 100 - i * colorGap));
  };
  const calcCircleR = () => {
    const radiusGap = (width.value / 2 - ringWidth.value / 2) / ringNum.value;

    circleR.value = new Array(ringNum.value).fill(0).map((_, i) => radiusGap * (i + 1));
  };
  const calcSplitLinePoints = () => {
    const angleGap = Math.PI / 6;
    const r = width.value / 2;

    splitLinePoints.value = new Array(6).fill('').map((_, i) => {
      const startAngle = angleGap * (i + 1);
      const endAngle = startAngle + Math.PI;
      const startPoint = getCircleRadianPoint(x.value, y.value, r, startAngle);
      const endPoint = getCircleRadianPoint(x.value, y.value, r, endAngle);

      return `${startPoint.join(',')} ${endPoint.join(',')}`;
    });
  };
  const calcArcD = () => {
    const angleGap = Math.PI / 6;
    const r = width.value / 2 - 1;

    arcD.value = new Array(4).fill('').map((_, i) => {
      const startAngle = angleGap * (3 * i + 1);
      const endAngle = startAngle + angleGap;
      const startPoint = getCircleRadianPoint(x.value, y.value, r, startAngle);
      const endPoint = getCircleRadianPoint(x.value, y.value, r, endAngle);

      return `M${startPoint.join(',')} A${x}, ${y} 0 0 1 ${endPoint.join(',')}`;
    });
  };
  const getCircleRadianPoint = (x, y, radius, radian) => {
    return [x + Math.cos(radian) * radius, y + Math.sin(radian) * radius];
  };
</script>

<style lang="less" scoped>
  @import './decoration.less';
</style>

<template>
  <div class="dv-decoration-8" :ref="'Decoration8'" :style="style">
    <svg
      :width="`${svgWH[0]}px`"
      :height="`${svgWH[1]}px`"
      :style="`transform:scale(${svgScale[0]},${svgScale[1]});`"
    >
      <defs>
        <polygon :id="polygonId" points="15, 46.5, 21, 47.5, 21, 52.5, 15, 53.5" />
      </defs>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="10"
        stroke-dasharray="80, 100, 30, 100"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke="mergedColor[0]"
        stroke-width="6"
        stroke-dasharray="50, 66, 100, 66"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;-360 50 50"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="38"
        fill="transparent"
        :stroke="fade(mergedColor[1], 30)"
        stroke-width="1"
        stroke-dasharray="5, 1"
      />

      <use
        v-for="(_foo, i) in new Array(20).fill(0)"
        :key="i"
        :xlink:href="`#${polygonId}`"
        :stroke="mergedColor[1]"
        :fill="Math.random() > 0.4 ? 'transparent' : mergedColor[0]"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          :dur="`${dur}s`"
          :begin="`${(i * dur) / 20}s`"
          repeatCount="indefinite"
        />
      </use>

      <circle
        cx="50"
        cy="50"
        r="26"
        fill="transparent"
        :stroke="fade(mergedColor[1], 30)"
        stroke-width="1"
        stroke-dasharray="5, 1"
      />
    </svg>

    <slot></slot>
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
  const Decoration8 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration8);
  const state = reactive<{ polygonId: string; svgWH: number[]; svgScale: number[] }>({
    polygonId: `decoration-8-polygon-12`,
    svgWH: [100, 100],
    svgScale: [1, 1],
  });
  const { polygonId, svgWH, svgScale } = toRefs(state);
  nextTick(() => {
    width.value = formatNumber(props?.style?.width, unref(width));
    height.value = formatNumber(props?.style?.height, unref(height));
    state.svgScale = [width.value / state.svgWH[0], height.value / state.svgWH[1]];
  });
  onMounted(() => {});
</script>

<style lang="less" scoped>
  @import './decoration.less';
</style>

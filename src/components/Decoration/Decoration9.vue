<template>
  <div class="dv-decoration-9" :ref="'Decoration9'" :style="style">
    <svg :width="width" :height="height">
      <polyline
        :stroke="mergedColor[1]"
        stroke-width="2"
        :points="`0, ${height / 2} ${width}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        :points="`5, ${height / 2} ${width * 0.2 - 3}, ${height / 2}`"
        :stroke-dasharray="`0, ${width * 0.2}`"
        fill="freeze"
      >
        <animate
          :id="animationId2"
          attributeName="stroke-dasharray"
          :values="`0, ${width * 0.2};${width * 0.2}, 0;`"
          dur="3s"
          :begin="`${animationId1}.end`"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          :values="`${width * 0.2}, 0;0, ${width * 0.2}`"
          dur="0.01s"
          :begin="`${animationId7}.end`"
          fill="freeze"
        />
      </polyline>

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        :points="`${width * 0.2 + 3}, ${height / 2} ${width * 0.8 - 3}, ${height / 2}`"
        :stroke-dasharray="`0, ${width * 0.6}`"
      >
        <animate
          :id="animationId4"
          attributeName="stroke-dasharray"
          :values="`0, ${width * 0.6};${width * 0.6}, 0`"
          dur="3s"
          :begin="`${animationId3}.end + 1s`"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          :values="`${width * 0.6}, 0;0, ${width * 0.6}`"
          dur="0.01s"
          :begin="`${animationId7}.end`"
          fill="freeze"
        />
      </polyline>

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        :points="`${width * 0.8 + 3}, ${height / 2} ${width - 5}, ${height / 2}`"
        :stroke-dasharray="`0, ${width * 0.2}`"
      >
        <animate
          :id="animationId6"
          attributeName="stroke-dasharray"
          :values="`0, ${width * 0.2};${width * 0.2}, 0`"
          dur="3s"
          :begin="`${animationId5}.end + 1s`"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          :values="`${width * 0.2}, 0;0, ${width * 0.3}`"
          dur="0.01s"
          :begin="`${animationId7}.end`"
          fill="freeze"
        />
      </polyline>

      <circle cx="2" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          :id="animationId1"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`0s;${animationId7}.end`"
          dur="0.3s"
          fill="freeze"
        />
      </circle>

      <circle :cx="width * 0.2" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          :id="animationId3"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`${animationId2}.end`"
          dur="0.3s"
          fill="freeze"
        />
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[1]}`"
          dur="0.01s"
          :begin="`${animationId7}.end`"
          fill="freeze"
        />
      </circle>

      <circle :cx="width * 0.8" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          :id="animationId5"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`${animationId4}.end`"
          dur="0.3s"
          fill="freeze"
        />
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[1]}`"
          dur="0.01s"
          :begin="`${animationId7}.end`"
          fill="freeze"
        />
      </circle>

      <circle :cx="width - 2" :cy="height / 2" r="2" :fill="mergedColor[1]">
        <animate
          :id="animationId7"
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]}`"
          :begin="`${animationId6}.end`"
          dur="0.3s"
          fill="freeze"
        />
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[1]}`"
          dur="0.01s"
          :begin="`${animationId7}.end`"
          fill="freeze"
        />
      </circle>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, onMounted, ref, unref, reactive, toRefs } from 'vue';
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
  const Decoration9 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration9);
  const state = reactive<{
    animationId1: string;
    animationId2: string;
    animationId3: string;
    animationId4: string;
    animationId5: string;
    animationId6: string;
    animationId7: string;
  }>({
    animationId1: `d9ani112`,
    animationId2: `d9ani212`,
    animationId3: `d9ani312`,
    animationId4: `d9ani412`,
    animationId5: `d9ani512`,
    animationId6: `d9ani612`,
    animationId7: `d9ani712`,
  });
  const {
    animationId1,
    animationId2,
    animationId3,
    animationId4,
    animationId5,
    animationId6,
    animationId7,
  } = toRefs(state);
  nextTick(() => {
    width.value = formatNumber(props?.style?.width, unref(width));
    height.value = formatNumber(props?.style?.height, unref(height));
  });
  onMounted(() => {});
</script>

<style lang="less" scoped>
  @import './decoration.less';
</style>

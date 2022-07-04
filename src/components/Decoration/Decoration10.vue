<template>
  <div class="dv-decoration-10" :ref="'Decoration10'" :style="style">
    <svg :width="width" :height="height">
      <polygon
        :fill="fade(mergedColor[1], 10)"
        :stroke="mergedColor[1]"
        :points="`20 10, 25 4, 55 4 60 10`"
      />

      <polygon
        :fill="fade(mergedColor[1], 10)"
        :stroke="mergedColor[1]"
        :points="`20 ${height - 10}, 25 ${height - 4}, 55 ${height - 4} 60 ${height - 10}`"
      />

      <polygon
        :fill="fade(mergedColor[1], 10)"
        :stroke="mergedColor[1]"
        :points="`${width - 20} 10, ${width - 25} 4, ${width - 55} 4 ${width - 60} 10`"
      />

      <polygon
        :fill="fade(mergedColor[1], 10)"
        :stroke="mergedColor[1]"
        :points="`${width - 20} ${height - 10}, ${width - 25} ${height - 4}, ${width - 55} ${
          height - 4
        } ${width - 60} ${height - 10}`"
      />

      <polygon
        :fill="fade(mergedColor[0], 20)"
        :stroke="mergedColor[0]"
        :points="`
          20 10, 5 ${height / 2} 20 ${height - 10}
          ${width - 20} ${height - 10} ${width - 5} ${height / 2} ${width - 20} 10
        `"
      />

      <polyline
        fill="transparent"
        :stroke="fade(mergedColor[0], 70)"
        :points="`25 18, 15 ${height / 2} 25 ${height - 18}`"
      />

      <polyline
        fill="transparent"
        :stroke="fade(mergedColor[0], 70)"
        :points="`${width - 25} 18, ${width - 15} ${height / 2} ${width - 25} ${height - 18}`"
      />
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
      dur?: number;
    }>(),
    {
      mergedColor: () => ['#1a98fc', '#2cf7fe'],
      style: () => {
        return {};
      },
      reverse: false,
      dur: 6,
    },
  );
  const Decoration10 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration10);

  nextTick(() => {
    width.value = formatNumber(props?.style?.width, unref(width));
    height.value = formatNumber(props?.style?.height, unref(height));
  });
  onMounted(() => {});
</script>

<style lang="less" scoped>
  @import './decoration.less';
</style>

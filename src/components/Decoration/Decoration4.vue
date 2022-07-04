<template>
  <div class="dv-decoration-4" :ref="'Decoration4'" :style="style">
    <div
      :class="`dv-container ${reverse ? 'reverse' : 'normal'}`"
      :style="
        reverse
          ? `width:${width}px;height:5px;animation-duration:${dur}s`
          : `width:5px;height:${height}px;animation-duration:${dur}s`
      "
    >
      <svg :width="reverse ? width : 5" :height="reverse ? 5 : height">
        <polyline
          :stroke="mergedColor[0]"
          :points="reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`"
        />
        <polyline
          class="bold-line"
          :stroke="mergedColor[1]"
          stroke-width="3"
          stroke-dasharray="20, 80"
          stroke-dashoffset="-30"
          :points="reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, onMounted, reactive, ref, toRef, toRefs, unref } from 'vue';
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
  const Decoration4 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration4);

  nextTick(() => {
    width.value = formatNumber(props?.style?.width, unref(width));
    height.value = formatNumber(props?.style?.height, unref(height));
  });
  onMounted(() => {});
</script>

<style lang="less" scoped>
  @import './decoration.less';
</style>

<template>
  <div class="dv-decoration-7" :ref="'Decoration7'" :style="style">
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="10, 0 19, 10 10, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="2, 0 11, 10 2, 20"
      />
    </svg>
    <slot></slot>
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="11, 0 2, 10 11, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="19, 0 10, 10 19, 20"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, onMounted, ref, unref } from 'vue';
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
  const Decoration7 = ref<HTMLElement>();
  let { width, height } = useDecoration(Decoration7);

  nextTick(() => {
    width.value = formatNumber(props?.style?.width, unref(width));
    height.value = formatNumber(props?.style?.height, unref(height));
  });
  onMounted(() => {});
</script>

<style lang="less" scoped>
  @import './decoration.less';
</style>

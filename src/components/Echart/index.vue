<template>
  <a-spin tip="Loading..." :spinning="isLoading" wrapperClassName="spinner-loading">
    <div v-if="!isEmpty" ref="chartContainer" class="chart-container" :style="style"></div>
    <a-empty v-else :image="simpleImage" />
  </a-spin>
</template>
<script lang="ts" setup>
  import { CSSProperties, nextTick, Ref, ref, watch } from 'vue';
  import { Empty } from 'ant-design-vue';
  import { useECharts } from '@/hooks/useECharts';
  const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  const chartContainer = ref<HTMLElement>();

  const props = withDefaults(
    defineProps<{
      option: any;
      isLoading?: boolean;
      style?: CSSProperties;
      isEmpty?: boolean;
      theme?: 'light' | 'dark' | 'default';
    }>(),
    {
      option: () => ({}),
      isLoading: true,
      style: () => {
        return {
          height: '100%',
        };
      },
      isEmpty: false,
      theme: 'default',
    },
  );
  const { setOptions } = useECharts(chartContainer as Ref<HTMLDivElement>, props);
  nextTick(() => {
    setOptions(props.option);
  });
</script>

<style>
  .chart-container {
    min-height: 100px;
    border: 1px solid #ddd;
  }

  .spinner-loading > div:not([class]) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

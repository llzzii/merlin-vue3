<template>
  <div class="grid-container" ref="gridContainer" :style="state.mergedStyle">
    <slot></slot>
    <grid-item
      class="grid-placeholder"
      v-show="state.isDragging"
      :x="state.placeholder.x"
      :y="state.placeholder.y"
      :w="state.placeholder.w"
      :h="state.placeholder.h"
      :i="state.placeholder.i"
    />
  </div>
</template>

<script lang="ts" setup>
  import { provide, onMounted, reactive, ref, watch, getCurrentInstance } from 'vue';
  import { gridEmitter } from './helpers/utils';
  import { useGridLayout } from './helpers/layout';
  import { GridItem } from '@/components';
  import { LayoutProps, LayoutSate } from './types';
  const props = withDefaults(
    defineProps<{
      autoSize?: boolean;
      colNum?: number;
      rowHeight?: number;
      maxRows?: number;
      margin?: Array<any>;
      isDraggable?: boolean;
      isResizable?: boolean;
      isMirrored?: boolean;
      useCssTransforms?: boolean;
      verticalCompact?: boolean;
      layout: Array<any>;
      responsive?: boolean;
      responsiveLayouts?: Object;
      breakpoints?: Object;
      cols?: Object;
      useStyleCursor?: boolean;
      preventCollision?: boolean;
    }>(),
    {
      autoSize: true,
      colNum: 12,
      rowHeight: 50,
      maxRows: Infinity,
      margin: () => {
        return [10, 10];
      },
      isDraggable: true,
      isResizable: true,
      isMirrored: false,
      useCssTransforms: true,
      verticalCompact: true,
      layout: () => {
        return [];
      },
      responsive: false,
      responsiveLayouts: () => {
        return {};
      },
      breakpoints: () => {
        return { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
      },
      cols: () => {
        return { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
      },
      preventCollision: false,
      useStyleCursor: true,
    },
  );
  const gridContainer = ref<HTMLElement | null>(null);

  const state = reactive<LayoutSate>({
    width: undefined,
    mergedStyle: {},
    lastLayoutLength: 0,
    isDragging: false,
    placeholder: {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      i: -1,
    },
    layouts: {}, // array to store all layouts from different breakpoints
    lastBreakpoint: null, // store last active breakpoint
    originalLayout: [], // store original Layout
  });
  const emits = defineEmits(['update:layout']);
  const { init, resizeEvent, dragEvent } = useGridLayout(state, props, gridContainer, emits);
  gridEmitter.on('resizeEvent', ({ ...res }) => {
    resizeEvent(res?.eventType, res?.i, res?.x, res?.y, res?.h, res?.w);
  });
  gridEmitter.on(
    'dragEvent',
    ({ eventType = null, i = null, x = null, y = null, h = null, w = null }) => {
      dragEvent(eventType, i, x, y, h, w);
    },
  );
  let x = ref();
  provide('layoutInstance', x);

  onMounted(() => {
    console.log("🚀 ~ file: GridLayout.vue ~ line 106 ~ onMounted ~ x.value", x.value)
  init();
    x.value = getCurrentInstance();
    console.log("🚀 ~ file: GridLayout.vue ~ line 107 ~ onMounted ~ x.value", x.value)
    gridEmitter.emit('layout-mounted', props.layout);
    gridEmitter.emit('layoutInstance', x);
  });
</script>

<style lang="less" scoped>
  .grid-container {
    position: relative;
    transition: height 200ms ease;
  }
</style>

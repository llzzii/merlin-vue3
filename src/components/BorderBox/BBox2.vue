<template>
  <div class="dv-border-box-2" :ref="'BBox2'" :style="style">
    <svg class="border" :width="state.width" :height="state.height">
      <polygon
        :fill="state.backgroundColor"
        :points="`10, 27 10, ${state.height - 27} 13, ${state.height - 24} 13, ${
          state.height - 21
        } 24, ${state.height - 11}
      38, ${state.height - 11} 41, ${state.height - 8} 73, ${state.height - 8} 75, ${
          state.height - 10
        } 81, ${state.height - 10}
      85, ${state.height - 6} ${state.width - 85}, ${state.height - 6} ${state.width - 81}, ${
          state.height - 10
        } ${state.width - 75}, ${state.height - 10}
      ${state.width - 73}, ${state.height - 8} ${state.width - 41}, ${state.height - 8} ${
          state.width - 38
        }, ${state.height - 11}
      ${state.width - 24}, ${state.height - 11} ${state.width - 13}, ${state.height - 21} ${
          state.width - 13
        }, ${state.height - 24}
      ${state.width - 10}, ${state.height - 27} ${state.width - 10}, 27 ${state.width - 13}, 25 ${
          state.width - 13
        }, 21
      ${state.width - 24}, 11 ${state.width - 38}, 11 ${state.width - 41}, 8 ${
          state.width - 73
        }, 8 ${state.width - 75}, 10
      ${state.width - 81}, 10 ${
          state.width - 85
        }, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`"
      />
    </svg>

    <svg
      :width="borderWidth + 'px'"
      :height="borderHeight + 'px'"
      :key="item"
      v-for="item in border"
      :class="`${item} border`"
    >
      <polygon
        :fill="mergedColor[0]"
        points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="mergedColor[1]"
        points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="mergedColor[0]"
        points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};transparent`"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, reactive, ref, unref } from 'vue';
  import { formatNumber } from '@/utils/format';
  import { useBBox } from './useBBox';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
      border?: Array<string>;
      borderWidth?: number;
      borderHeight?: number;
    }>(),
    {
      style: () => {
        return {};
      },
      mergedColor: () => ['#4fd2dd', '#235fa7'],
      border: () => ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
      borderWidth: 150,
      borderHeight: 150,
    },
  );
  const BBox2 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox2);
  console.log('🚀 ~ file: BBox2.vue ~ line 99 ~ width', width, height);
  const state = reactive({
    width: formatNumber(props?.style?.width, unref(width)),
    height: formatNumber(props?.style?.height, unref(height)),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
  });
  nextTick(() => {
    console.log('🚀 ~ file: BBox2.vue ~ line 106 ~ width', width, height);
    state.width = formatNumber(props?.style?.width, unref(width));
    state.height = formatNumber(props?.style?.height, unref(height));
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

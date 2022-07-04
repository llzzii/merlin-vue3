<template>
  <div class="dv-border-box-12" :ref="'BBox12'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <defs>
        <filter :id="state.filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
          <feFlood :flood-color="fade(mergedColor[1], 70)" result="glowColor">
            <animate
              attributeName="flood-color"
              :values="`
                ${fade(mergedColor[1], 70)};
                ${fade(mergedColor[1], 30)};
                ${fade(mergedColor[1], 70)};
              `"
              dur="3s"
              begin="0s"
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        v-if="state.width && state.height"
        :fill="state.backgroundColor"
        stroke-width="2"
        :stroke="mergedColor[0]"
        :d="`
          M15 5 L ${state.width - 15} 5 Q ${state.width - 5} 5, ${state.width - 5} 15
          L ${state.width - 5} ${state.height - 15} Q ${state.width - 5} ${state.height - 5}, ${
          state.width - 15
        } ${state.height - 5}
          L 15, ${state.height - 5} Q 5 ${state.height - 5} 5 ${state.height - 15} L 5 15
          Q 5 5 15 5
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${state.filterId})`"
        :stroke="mergedColor[1]"
        :d="`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${state.filterId})`"
        :stroke="mergedColor[1]"
        :d="`M ${state.width - 20} 5 L ${state.width - 15} 5 Q ${state.width - 5} 5 ${
          state.width - 5
        } 15 L ${state.width - 5} 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${state.filterId})`"
        :stroke="mergedColor[1]"
        :d="`
          M ${state.width - 20} ${state.height - 5} L ${state.width - 15} ${state.height - 5}
          Q ${state.width - 5} ${state.height - 5} ${state.width - 5} ${state.height - 15}
          L ${state.width - 5} ${state.height - 20}
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${state.filterId})`"
        :stroke="mergedColor[1]"
        :d="`
          M 20 ${state.height - 5} L 15 ${state.height - 5}
          Q 5 ${state.height - 5} 5 ${state.height - 15}
          L 5 ${state.height - 20}
        `"
      />
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
  import { fade } from './colors';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
    }>(),
    {
      mergedColor: () => ['#235fa7', '#4fd2dd'],
      style: () => {
        return {};
      },
    },
  );
  const BBox12 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox12);
  const state = reactive({
    width: formatNumber(props?.style?.width, unref(width)),
    height: formatNumber(props?.style?.height, unref(height)),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
    filterId: 'border-box-11-filterId-12',
  });

  nextTick(() => {
    state.width = formatNumber(props?.style?.width, unref(width));
    state.height = formatNumber(props?.style?.height, unref(height));
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

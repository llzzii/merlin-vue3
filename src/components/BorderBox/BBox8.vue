<template>
  <div class="dv-border-box-8" :ref="'BBox8'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <defs>
        <path :id="state.path" :d="pathD" fill="transparent" />
        <radialGradient :id="state.gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="state.mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${state.gradient})`">
            <animateMotion :dur="`${dur}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>

      <polygon
        :fill="state.backgroundColor"
        :points="`5, 5 ${state.width - 5}, 5 ${state.width - 5} ${state.height - 5} 5, ${
          state.height - 5
        }`"
      />

      <use :stroke="mergedColor[0]" stroke-width="1" :xlink:href="`#${state.path}`" />

      <use
        :stroke="mergedColor[1]"
        stroke-width="3"
        :xlink:href="`#${state.path}`"
        :mask="`url(#${state.mask})`"
      >
        <animate
          attributeName="stroke-dasharray"
          :from="`0, ${length}`"
          :to="`${length}, 0`"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>
    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, nextTick, reactive, ref, unref, computed } from 'vue';
  import { formatNumber } from '@/utils/format';
  import { useBBox } from './useBBox';

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
      dur?: number;
      reverse?: boolean;
    }>(),
    {
      mergedColor: () => ['#235fa7', '#4fd2dd'],
      style: () => {
        return {};
      },
      dur: 3,
      reverse: false,
    },
  );
  const BBox8 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox8);
  const state = reactive({
    width: formatNumber(props?.style?.width, unref(width)),
    height: formatNumber(props?.style?.height, unref(height)),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
    path: 'border-box-8-path-12',
    gradient: 'border-box-8-gradient-12',
    mask: 'border-box-8-mask-12',
  });
  const length = computed(() => (state.width + state.height - 5) * 2);
  const pathD = computed(() => {
    console.log('reverse  2', props.reverse);

    if (props.reverse) {
      console.log('reverse  ', props.reverse);
      return `M 2.5, 2.5 L 2.5, ${unref(height) - 2.5} L ${unref(width) - 2.5}, ${
        unref(height) - 2.5
      } L ${unref(width) - 2.5}, 2.5 L 2.5, 2.5`;
    } else {
      return `M2.5, 2.5 L${unref(width) - 2.5}, 2.5 L${unref(width) - 2.5}, ${
        unref(height) - 2.5
      } L2.5, ${unref(height) - 2.5} L2.5, 2.5`;
    }
  });
  nextTick(() => {
    state.width = formatNumber(props?.style?.width, unref(width));
    state.height = formatNumber(props?.style?.height, unref(height));
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

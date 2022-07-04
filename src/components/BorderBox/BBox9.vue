<template>
  <div class="dv-border-box-9" :ref="'BBox9'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <defs>
        <linearGradient :id="state.gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <animate
            attributeName="x1"
            values="0%;100%;0%"
            dur="10s"
            begin="0s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="x2"
            values="100%;0%;100%"
            dur="10s"
            begin="0s"
            repeatCount="indefinite"
          />

          <stop offset="0%" :stop-color="mergedColor[0]">
            <animate
              attributeName="stop-color"
              :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" :stop-color="mergedColor[1]">
            <animate
              attributeName="stop-color"
              :values="`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        <mask :id="state.maskId">
          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`8, ${state.height * 0.4} 8, 3, ${state.width * 0.4 + 7}, 3`"
          />
          <polyline
            fill="#fff"
            :points="`8, ${state.height * 0.15} 8, 3, ${state.width * 0.1 + 7}, 3
              ${state.width * 0.1}, 8 14, 8 14, ${state.height * 0.15 - 7}
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`${state.width * 0.5}, 3 ${state.width - 3}, 3, ${state.width - 3}, ${
              state.height * 0.25
            }`"
          />
          <polyline
            fill="#fff"
            :points="`
              ${state.width * 0.52}, 3 ${state.width * 0.58}, 3
              ${state.width * 0.58 - 7}, 9 ${state.width * 0.52 + 7}, 9
            `"
          />
          <polyline
            fill="#fff"
            :points="`
              ${state.width * 0.9}, 3 ${state.width - 3}, 3 ${state.width - 3}, ${
              state.height * 0.1
            }
              ${state.width - 9}, ${state.height * 0.1 - 7} ${state.width - 9}, 9 ${
              state.width * 0.9 + 7
            }, 9
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`8, ${state.height * 0.5} 8, ${state.height - 3} ${state.width * 0.3 + 7}, ${
              state.height - 3
            }`"
          />
          <polyline
            fill="#fff"
            :points="`
              8, ${state.height * 0.55} 8, ${state.height * 0.7}
              2, ${state.height * 0.7 - 7} 2, ${state.height * 0.55 + 7}
            `"
          />

          <polyline
            stroke="#fff"
            stroke-width="3"
            fill="transparent"
            :points="`${state.width * 0.35}, ${state.height - 3} ${state.width - 3}, ${
              state.height - 3
            } ${state.width - 3}, ${height * 0.35}`"
          />
          <polyline
            fill="#fff"
            :points="`
              ${state.width * 0.92}, ${state.height - 3} ${state.width - 3}, ${state.height - 3} ${
              state.width - 3
            }, ${height * 0.8}
              ${state.width - 9}, ${state.height * 0.8 + 7} ${state.width - 9}, ${
              state.height - 9
            } ${state.width * 0.92 + 7}, ${height - 9}
            `"
          />
        </mask>
      </defs>

      <polygon
        :fill="state.backgroundColor"
        :points="`
        15, 9 ${state.width * 0.1 + 1}, 9 ${state.width * 0.1 + 4}, 6 ${state.width * 0.52 + 2}, 6
        ${state.width * 0.52 + 6}, 10 ${state.width * 0.58 - 7}, 10 ${state.width * 0.58 - 2}, 6
        ${state.width * 0.9 + 2}, 6 ${state.width * 0.9 + 6}, 10 ${state.width - 10}, 10 ${
          state.width - 10
        }, ${height * 0.1 - 6}
        ${state.width - 6}, ${state.height * 0.1 - 1} ${state.width - 6}, ${
          state.height * 0.8 + 1
        } ${state.width - 10}, ${height * 0.8 + 6}
        ${state.width - 10}, ${state.height - 10} ${state.width * 0.92 + 7}, ${
          state.height - 10
        }  ${state.width * 0.92 + 2}, ${height - 6}
        11, ${state.height - 6} 11, ${state.height * 0.15 - 2} 15, ${state.height * 0.15 - 7}
      `"
      />

      <rect
        x="0"
        y="0"
        :width="width"
        :height="height"
        :fill="`url(#${state.gradientId})`"
        :mask="`url(#${state.maskId})`"
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

  const props = withDefaults(
    defineProps<{
      style?: CSSProperties;
      mergedColor?: Array<string>;
      dur?: number;
      reverse?: boolean;
    }>(),
    {
      mergedColor: () => ['#11eefd', '#0078d2'],
      style: () => {
        return {};
      },
      dur: 3,
      reverse: false,
    },
  );
  const BBox9 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox9);
  const state = reactive({
    width: formatNumber(props?.style?.width, unref(width)),
    height: formatNumber(props?.style?.height, unref(height)),
    backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : 'transparent',
    path: 'border-box-9-path-12',
    gradientId: 'border-box-9-gradient-12',
    maskId: 'border-box-9-mask-12',
  });

  nextTick(() => {
    state.width = formatNumber(props?.style?.width, unref(width));
    state.height = formatNumber(props?.style?.height, unref(height));
  });
</script>

<style lang="less" scoped>
  @import './border-box.less';
</style>

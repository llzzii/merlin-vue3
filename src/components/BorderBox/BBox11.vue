<template>
  <div class="dv-border-box-11" :ref="'BBox11'" :style="style">
    <svg class="dv-border-svg-container" :width="state.width" :height="state.height">
      <defs>
        <filter :id="state.filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood :flood-color="mergedColor[1]" result="glowColor" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <polygon
        :fill="state.backgroundColor"
        :points="`
        20, 32 ${state.width * 0.5 - titleWidth / 2}, 32 ${
          state.width * 0.5 - titleWidth / 2 + 20
        }, 53
        ${state.width * 0.5 + titleWidth / 2 - 20}, 53 ${state.width * 0.5 + titleWidth / 2}, 32
        ${state.width - 20}, 32 ${state.width - 8}, 48 ${state.width - 8}, ${state.height - 25} ${
          state.width - 20
        }, ${state.height - 8}
        20, ${state.height - 8} 8, ${state.height - 25} 8, 50
      `"
      />

      <polyline
        :stroke="mergedColor[0]"
        :filter="`url(#${state.filterId})`"
        :points="`
          ${(state.width - titleWidth) / 2}, 30
          20, 30 7, 50 7, ${50 + (state.height - 167) / 2}
          13, ${55 + (state.height - 167) / 2} 13, ${135 + (state.height - 167) / 2}
          7, ${140 + (state.height - 167) / 2} 7, ${state.height - 27}
          20, ${state.height - 7} ${state.width - 20}, ${state.height - 7} ${state.width - 7}, ${
          state.height - 27
        }
          ${state.width - 7}, ${140 + (state.height - 167) / 2} ${state.width - 13}, ${
          135 + (state.height - 167) / 2
        }
          ${state.width - 13}, ${55 + (state.height - 167) / 2} ${state.width - 7}, ${
          50 + (state.height - 167) / 2
        }
          ${state.width - 7}, 50 ${state.width - 20}, 30 ${(state.width + titleWidth) / 2}, 30
          ${(state.width + titleWidth) / 2 - 20}, 7 ${(state.width - titleWidth) / 2 + 20}, 7
          ${(state.width - titleWidth) / 2}, 30 ${(state.width - titleWidth) / 2 + 20}, 52
          ${(state.width + titleWidth) / 2 - 20}, 52 ${(state.width + titleWidth) / 2}, 30
        `"
      />

      <polygon
        :stroke="mergedColor[0]"
        fill="transparent"
        :points="`
          ${(state.width + titleWidth) / 2 - 5}, 30 ${(state.width + titleWidth) / 2 - 21}, 11
          ${(state.width + titleWidth) / 2 - 27}, 11 ${(state.width + titleWidth) / 2 - 8}, 34
        `"
      />

      <polygon
        :stroke="mergedColor[0]"
        fill="transparent"
        :points="`
          ${(state.width - titleWidth) / 2 + 5}, 30 ${(state.width - titleWidth) / 2 + 22}, 49
          ${(state.width - titleWidth) / 2 + 28}, 49 ${(state.width - titleWidth) / 2 + 8}, 26
        `"
      />

      <polygon
        :stroke="mergedColor[0]"
        :fill="fade(mergedColor[1], 30)"
        :filter="`url(#${state.filterId})`"
        :points="`
          ${(state.width + titleWidth) / 2 - 11}, 37 ${(state.width + titleWidth) / 2 - 32}, 11
          ${(state.width - titleWidth) / 2 + 23}, 11 ${(state.width - titleWidth) / 2 + 11}, 23
          ${(state.width - titleWidth) / 2 + 33}, 49 ${(state.width + titleWidth) / 2 - 22}, 49
        `"
      />

      <polygon
        :filter="`url(#${state.filterId})`"
        :fill="mergedColor[0]"
        opacity="1"
        :points="`
          ${(state.width - titleWidth) / 2 - 10}, 37 ${(state.width - titleWidth) / 2 - 31}, 37
          ${(state.width - titleWidth) / 2 - 25}, 46 ${(state.width - titleWidth) / 2 - 4}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${state.filterId})`"
        :fill="mergedColor[0]"
        opacity="0.7"
        :points="`
          ${(state.width - titleWidth) / 2 - 40}, 37 ${(state.width - titleWidth) / 2 - 61}, 37
          ${(state.width - titleWidth) / 2 - 55}, 46 ${(state.width - titleWidth) / 2 - 34}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.4;0.7"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${state.filterId})`"
        :fill="mergedColor[0]"
        opacity="0.5"
        :points="`
          ${(state.width - titleWidth) / 2 - 70}, 37 ${(state.width - titleWidth) / 2 - 91}, 37
          ${(state.width - titleWidth) / 2 - 85}, 46 ${(state.width - titleWidth) / 2 - 64}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.2;0.5"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${state.filterId})`"
        :fill="mergedColor[0]"
        opacity="1"
        :points="`
          ${(state.width + titleWidth) / 2 + 30}, 37 ${(state.width + titleWidth) / 2 + 9}, 37
          ${(state.width + titleWidth) / 2 + 3}, 46 ${(state.width + titleWidth) / 2 + 24}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${state.filterId})`"
        :fill="mergedColor[0]"
        opacity="0.7"
        :points="`
          ${(state.width + titleWidth) / 2 + 60}, 37 ${(state.width + titleWidth) / 2 + 39}, 37
          ${(state.width + titleWidth) / 2 + 33}, 46 ${(state.width + titleWidth) / 2 + 54}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.4;0.7"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <polygon
        :filter="`url(#${state.filterId})`"
        :fill="mergedColor[0]"
        opacity="0.5"
        :points="`
          ${(state.width + titleWidth) / 2 + 90}, 37 ${(state.width + titleWidth) / 2 + 69}, 37
          ${(state.width + titleWidth) / 2 + 63}, 46 ${(state.width + titleWidth) / 2 + 84}, 46
        `"
      >
        <animate
          attributeName="opacity"
          values="0.5;0.2;0.5"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>

      <text
        class="dv-border-box-11-title"
        :x="`${state.width / 2}`"
        y="32"
        fill="#fff"
        font-size="18"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {{ title }}
      </text>

      <polygon
        :fill="mergedColor[0]"
        :filter="`url(#${state.filterId})`"
        :points="`
          7, ${53 + (state.height - 167) / 2} 11, ${57 + (state.height - 167) / 2}
          11, ${133 + (state.height - 167) / 2} 7, ${137 + (state.height - 167) / 2}
        `"
      />

      <polygon
        :fill="mergedColor[0]"
        :filter="`url(#${state.filterId})`"
        :points="`
          ${state.width - 7}, ${53 + (state.height - 167) / 2} ${state.width - 11}, ${
          57 + (state.height - 167) / 2
        }
          ${state.width - 11}, ${133 + (state.height - 167) / 2} ${state.width - 7}, ${
          137 + (state.height - 167) / 2
        }
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
      titleWidth?: number;
      title?: string;
    }>(),
    {
      mergedColor: () => ['#235fa7', '#4fd2dd'],
      style: () => {
        return {};
      },
      title: '',
      titleWidth: 250,
    },
  );
  const BBox11 = ref<HTMLElement>();
  const { width, height } = useBBox(BBox11);
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

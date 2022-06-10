<template>
  <svg
    :class="['ml-svg-icon', $attrs.class, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import { defineComponent, computed } from 'vue';
  const props = withDefaults(
    defineProps<{
      name: string;
      prefix?: string;
      size?: string | number;
      spin?: boolean;
    }>(),
    {
      name: '',
      size: 16,
      spin: false,
      prefix: 'icon',
    },
  );
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);

  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    let s = `${size}`;
    s = `${s.replace('px', '')}px`;
    return {
      width: s,
      height: s,
    };
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'ml-svg-icon';

  .@{prefix-cls} {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>

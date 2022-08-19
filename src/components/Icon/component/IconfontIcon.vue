<template>
  <i :class="[props.class, 'iconfont ml-icon']" :style="getWrapStyle"></i>
</template>
<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue';

  const props = withDefaults(
    defineProps<{
      class: string;
      color?: string;
      size?: string | number;
    }>(),
    {
      class: '',
      color: '#000000d9',
      size: 16,
    },
  );

  const getWrapStyle = computed((): CSSProperties => {
    const { size, color } = props;
    let fs = size;
    if (typeof size == 'string') {
      fs = parseInt(size, 10);
    }

    return {
      fontSize: `${fs}px`,
      color: color,
      display: 'inline-flex',
    };
  });
</script>
<style lang="less">
  .app-iconify {
    display: inline-block;
    // vertical-align: middle;

    &-spin {
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }

  span.iconify {
    display: block;
    min-width: 1em;
    min-height: 1em;
    background-color: rgba(85, 85, 85, 0.067);
    border-radius: 100%;
  }
</style>

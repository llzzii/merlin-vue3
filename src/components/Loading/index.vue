<template>
  <div
    class="mr-loading"
    :class="{ absolute }"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <a-spin :tip="tip" :size="size" :spinning="loading" />
  </div>
</template>
<script lang="ts" setup>
  import { SizeEnum } from '@/constrant/enums';

  const props = withDefaults(
    defineProps<{
      tip?: string;
      size: SizeEnum.DEFAULT | SizeEnum.SMALL | SizeEnum.LARGE;
      absolute?: boolean;
      loading: boolean;
      background?: string;
    }>(),
    {
      tip: '',
      size: SizeEnum.DEFAULT,
      absolute: false,
      loading: false,
      background: '',
    },
  );
</script>

<style lang="less" scoped>
  .mr-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240 242 245 / 40%);
    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }
</style>

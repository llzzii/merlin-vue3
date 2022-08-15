<template>
  <div class="container" ref="viewportRef" @mousedown="($event) => handleClickBlankArea($event)">
    <div class="img-item" v-elementResize>
      <img :src="demoImg" />
    </div>

    <div
      v-if="mouseSelectionVisible"
      :class="`mouse-selection quadrant-${mouseSelectionQuadrant}`"
      :style="{
        top: mouseSelection.top + 'px',
        left: mouseSelection.left + 'px',
        width: mouseSelection.width + 'px',
        height: mouseSelection.height + 'px',
      }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
  import { useMouseSelection } from '@/hooks/useMouseSelection';
  import { ref } from 'vue';
  import demoImg from '@/assets/img/John_Miller.png';

  const viewportRef = ref<HTMLElement | undefined>();
  const { mouseSelection, mouseSelectionVisible, mouseSelectionQuadrant, updateMouseSelection } =
    useMouseSelection(viewportRef);
  const handleClickBlankArea = (e) => {
    updateMouseSelection(e);
  };
</script>

<style lang="less" scoped>
  .container {
    position: relative;
    width: calc(~'100% - 20px');
    height: calc(~'100% - 20px');
  }
  .mouse-selection {
    position: absolute;
    background-color: rgba(209, 68, 36, 0.1);
    border: 1px solid rgb(209, 68, 36);
    z-index: 200;

    &.quadrant-1 {
      transform-origin: 0 0;
      transform: rotate(180deg);
    }
    &.quadrant-2 {
      transform-origin: 50% 0;
      transform: rotate(180deg);
    }
    &.quadrant-3 {
      transform-origin: 0 50%;
      transform: rotate(180deg);
    }
    &.quadrant-4 {
      transform-origin: 0 0;
      transform: rotate(0deg);
    }
  }
  .img-item {
    position: absolute;
    left: 100px;
    top: 50px;

    img {
      width: 100px;
      height: 100px;
    }
  }
</style>

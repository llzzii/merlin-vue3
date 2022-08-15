<template>
  <div class="mask" @click="removeContext()" @mousedown="removeContext()"></div>
  <div
    v-for="item in borderLines"
    :key="item.type"
    :style="item.style"
    :class="['border-line', item.type, { wide: isWide }]"
  ></div>
  <div
    v-for="point in resizeHandlers"
    :key="point.direction"
    :type="point.direction"
    :style="point.style"
    @mousedown.stop="($event) => scaleElement($event, point.direction)"
    :class="['resize-handler', rotateClassName, point.direction]"
  ></div>
  <div
    class="rotate-handler"
    :style="{ left: elWidth / 2 + 'px' }"
    @mousedown.stop="rotateElement()"
  ></div>
</template>

<script lang="ts" setup>
  import { useDragAndResize } from '@/hooks/useDragAndResize';
  import { computed, PropType, ref } from 'vue';

  const props = defineProps({
    elRef: {
      type: HTMLElement,
      required: true,
    },
    removeContext: {
      type: Function,
      required: true,
    },
  });
  const isWide = true;
  const elWidth = computed(() => props.elRef.offsetWidth);
  const rotateClassName = computed(() => {
    const prefix = 'rotate-';
    const rotate = 0;
    if (rotate > -22.5 && rotate <= 22.5) return prefix + 0;
    else if (rotate > 22.5 && rotate <= 67.5) return prefix + 45;
    else if (rotate > 67.5 && rotate <= 112.5) return prefix + 90;
    else if (rotate > 112.5 && rotate <= 157.5) return prefix + 135;
    else if (rotate > 157.5 || rotate <= -157.5) return prefix + 0;
    else if (rotate > -157.5 && rotate <= -112.5) return prefix + 45;
    else if (rotate > -112.5 && rotate <= -67.5) return prefix + 90;
    else if (rotate > -67.5 && rotate <= -22.5) return prefix + 135;
    return prefix + 0;
  });
  const { resizeHandlers, borderLines, scaleElement } = useDragAndResize(ref(props.elRef));

  const rotateElement = () => {};
</script>

<style lang="less" scoped>
  .border-line {
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
    border: 0 dashed rgb(209, 68, 36);
    z-index: 9999;
    &.top {
      border-top-width: 1px;
    }
    &.bottom {
      border-bottom-width: 1px;
    }
    &.left {
      border-left-width: 1px;
    }
    &.right {
      border-right-width: 1px;
    }

    &.wide {
      &::before {
        content: '';
        position: absolute;
        background: transparent;
        cursor: move;
      }

      &.top::before {
        top: -8px;
        left: -8px;
        width: calc(100% + 16px);
        height: 16px;
      }
      &.bottom::before {
        bottom: -8px;
        left: -8px;
        width: calc(100% + 16px);
        height: 16px;
      }
      &.left::before {
        top: -8px;
        left: -8px;
        width: 16px;
        height: calc(100% + 16px);
      }
      &.right::before {
        top: -8px;
        right: -8px;
        width: 16px;
        height: calc(100% + 16px);
      }
    }
  }
  .resize-handler {
    position: absolute;
    width: 10px;
    height: 10px;
    left: 0;
    top: 0;
    margin: -5px 0 0 -5px;
    border: 1px solid rgb(209, 68, 36);
    background-color: #fff;
    border-radius: 1px;
    cursor: pointer;
    z-index: 9999;

    &.left-top.rotate-0,
    &.right-bottom.rotate-0,
    &.left.rotate-45,
    &.right.rotate-45,
    &.left-bottom.rotate-90,
    &.right-top.rotate-90,
    &.top.rotate-135,
    &.bottom.rotate-135 {
      cursor: nwse-resize;
    }
    &.top.rotate-0,
    &.bottom.rotate-0,
    &.left-top.rotate-45,
    &.right-bottom.rotate-45,
    &.left.rotate-90,
    &.right.rotate-90,
    &.left-bottom.rotate-135,
    &.right-top.rotate-135 {
      cursor: ns-resize;
    }
    &.left-bottom.rotate-0,
    &.right-top.rotate-0,
    &.top.rotate-45,
    &.bottom.rotate-45,
    &.left-top.rotate-90,
    &.right-bottom.rotate-90,
    &.left.rotate-135,
    &.right.rotate-135 {
      cursor: nesw-resize;
    }
    &.left.rotate-0,
    &.right.rotate-0,
    &.left-bottom.rotate-45,
    &.right-top.rotate-45,
    &.top.rotate-90,
    &.bottom.rotate-90,
    &.left-top.rotate-135,
    &.right-bottom.rotate-135 {
      cursor: ew-resize;
    }
  }
  .rotate-handler {
    position: absolute;
    width: 10px;
    height: 10px;
    top: -25px;
    margin-left: -5px;
    border: 1px solid rgb(209, 68, 36);
    background-color: #fff;
    border-radius: 1px;
    cursor: grab;
    z-index: 9999;
    &:active {
      cursor: grabbing;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9998;
  }
</style>

<template>
  <div class="container">
    <div class="d-left" ref="leftContainer1" :style="{ width: widthV + 'px' }"
      >右侧内容
      <h4>{{ width }}<br />{{ x }},{{ y }}</h4>
      <div class="h-container">
        <p ref="hContainerP" :style="{ height: heightV + 'px' }">
          上面内容heightV:{{ heightV }}
          <span class="drag-el-nei" ref="dragElH"></span>
        </p>
        <p>下面内容</p>
      </div>
      <span class="drag-el" ref="dragEl"></span>
    </div>
    <div class="d-right" ref="dRightEl">
      <h4>左侧内容</h4>
      <div ref="rightEl" :style="rstyle" class="r-el"> Drag me! I am at{{ rstyle }} </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, unref, reactive } from 'vue';
  import { useElementSize, useDraggable } from '@vueuse/core';
  const leftContainer1 = ref(null);
  const hContainerP = ref<HTMLElement | null>(null);
  const dragEl = ref<HTMLElement | null>(null);
  const dragElH = ref<HTMLElement | null>(null);
  const rightEl = ref<HTMLElement | null>(null);
  const dRightEl = ref<HTMLElement | null>(null);
  const { width } = useElementSize(leftContainer1);
  let widthV = ref<number>(200);
  let heightV = ref<number>(50);
  let rstyle = reactive<CSSProperties>({ left: 0, top: 60 });

  const { x } = useDraggable(dragEl, {
    onMove: () => {
      if (!unref(leftContainer1) || !x) return;

      const left = unref(leftContainer1).getBoundingClientRect().left;
      widthV.value = unref(x) - left;
    },
  });

  const { y } = useDraggable(dragElH, {
    onMove: () => {
      if (!unref(hContainerP) || !y) return;
      const top = unref(hContainerP).getBoundingClientRect().top;
      heightV.value = unref(y) - top;
    },
  });
  useDraggable(rightEl, {
    initialValue: {},
    onMove: ({ x: rx, y: ry }) => {
      if (!unref(dRightEl)) return;
      const top = unref(dRightEl).getBoundingClientRect().top;
      const left = unref(dRightEl).getBoundingClientRect().left;
      rstyle.left = unref(rx) - left + 'px';
      rstyle.top = unref(ry) - top + 'px';
    },
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 10px;
    min-height: 500px;
    background-color: #fff;
    display: flex;
    .d-left {
      border: 1px solid #ddd;
      padding: 10px;
      position: relative;
      .drag-el {
        position: absolute;
        width: 2px;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #ddd;
        cursor: e-resize;
      }
      .h-container {
        position: relative;
        .drag-el-nei {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #ddd;
          cursor: n-resize;
        }
      }
    }
    .d-right {
      border: 1px solid #ddd;
      padding: 10px;
      flex: 1;
      margin-left: 5px;
      position: relative;
      .r-el {
        position: absolute;
        border: 1px solid #ddd;
        padding: 10px;
        cursor: move;
      }
    }
  }
</style>

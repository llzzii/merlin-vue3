<template>
  <div class="header">
    <a-space>
      <a-button type="primary" @click="drawHandle('pen')">画笔</a-button>
      <a-button type="primary" @click="clearCanvas">清空画布</a-button>
      <a-button type="primary" @click="drawHandle('eraser')">橡皮擦</a-button>
      <div class="strokes-width">
        笔画粗细:
        <a-slider v-model:value="strokesWidth" :min="5" :max="50" @change="changeStrokes" />
      </div>
      <a-button type="primary" @click="exportImgUrl">导出</a-button>
    </a-space>
  </div>

  <div class="canvas-container">
    <canvas
      ref="canvasRef"
      :style="{
        width: canvasWidth + 'px',
        height: canvasHeight + 'px',
      }"
      @mousedown="($event) => handleMousedown($event)"
      @mousemove="($event) => handleMousemove($event)"
      @mouseup="handleMouseup()"
      @touchstart="($event) => handleMousedown($event)"
      @touchmove="($event) => handleMousemove($event)"
      @touchend="
        handleMouseup();
        mouseInCanvas = false;
      "
      @mouseleave="
        handleMouseup();
        mouseInCanvas = false;
      "
      @mouseenter="mouseInCanvas = true"
      @wheel="($event) => mousewheelListener($event)"
    ></canvas>
    <template v-if="mouseInCanvas">
      <div
        class="eraser"
        :style="{
          left: mouse.x - rubberSize / 2 + 'px',
          top: mouse.y - rubberSize / 2 + 'px',
          width: rubberSize + 'px',
          height: rubberSize + 'px',
        }"
        v-if="options && options?.model === 'eraser'"
      ></div>
      <div
        class="pen"
        v-if="options.model === 'pen'"
        :style="{
          left: mouse.x + 'px',
          top: mouse.y + 'px',
          color: options.color,
        }"
      >
        <i class="iconfont icon icon-fill" v-if="options.model === 'pen'"></i>
        <!-- <IconWrite class="icon" :size="penSize * 6" /> -->
      </div>
      <div
        class="pen"
        :style="{
          left: mouse.x + 'px',
          top: mouse.y + 'px',
          color: options.color,
        }"
        v-if="options.model === 'mark'"
      >
        <!-- <IconHighLight class="icon" :size="markSize * 1.5" v-if="options.model === 'mark'" /> -->
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useCanvas } from '@/hooks/useCanvas';
  import handleCopyImg from '@/hooks/useImgeCopy';
  import { onMounted, ref } from 'vue';

  const canvasRef = ref<HTMLCanvasElement>();
  const strokesWidth = ref(10);
  const {
    initCanvas,
    canvasWidth,
    canvasHeight,
    mousewheelListener,
    clearCanvas,
    handleMouseup,
    handleMousedown,
    handleMousemove,
    mouseInCanvas,
    penSize,
    rubberSize,
    markSize,
    options,
    mouse,
    getImageDataURL,
  } = useCanvas(canvasRef, { width: 1000 });

  const drawHandle = (model) => {
    // updateCtx('eraser');
    options.model = model;
  };

  const exportImgUrl = () => {
    const url = getImageDataURL();
    console.log('🚀 ~ file: canvas.vue ~ line 107 ~ exportImgUrl ~ url', url);
    handleCopyImg(url);
  };
  const changeStrokes = (e?) => {
    console.log('🚀 ~ file: canvas.vue ~ line 104 ~ changeStrokes ~ e', e);
    if (options.model === 'eraser') {
      rubberSize.value = strokesWidth.value;
    }
    if (options.model === 'pen') {
      penSize.value = strokesWidth.value;
    }
    if (options.model === 'mark') {
      markSize.value = strokesWidth.value;
    }
  };
  onMounted(() => {
    initCanvas();
    changeStrokes();
  });
</script>
<style lang="less" scoped>
  .canvas-container {
    background-color: #fff;
    padding: 10px;
    canvas {
      border: 1px dotted #f1f1f1;
    }
  }
  .header {
    background-color: #fff;
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    padding: 5px;
  }
  .blackboard {
    width: 100%;
    height: 100%;
    background-color: #0f392b;
  }
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .eraser,
  .pen {
    pointer-events: none;
    position: absolute;
    z-index: 9;

    .icon {
      filter: drop-shadow(2px 2px 2px #555);
    }
  }
  .eraser {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 4px solid rgba(85, 85, 85, 0.15);
    color: rgba(85, 85, 85, 0.75);
  }
  .strokes-width {
    width: 200px;
  }
</style>

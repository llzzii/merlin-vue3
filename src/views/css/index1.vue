<template>
  <div class="container">
    <h4 class="css1">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h4>
    <div class="word_container">
      <span class="word">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, quos incidunt consequuntur
        eius excepturi quisquam iusto ex ipsum ab eaque non ea, temporibus velit quia tenetur
        repellat accusamus itaque hic?
      </span>
      <span class="word_pesudo">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, quos incidunt consequuntur
        eius excepturi quisquam iusto ex ipsum ab eaque non ea, temporibus velit quia tenetur
        repellat accusamus itaque hic?
      </span>
    </div>
    <div ref="el" class="d3-element" :style="{ transform: transform }">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, iure vel nihil dolorum
      itaque a esse laudantium est deleniti earum possimus deserunt tempora rem. Error, molestias.
    </div>
    <div class="scroll-wrap">
      <div class="scroll-inner">
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <p>iusto voluptates autem! </p>
        <p>numquam nisi quam nam cumque provident </p>
        <p>你好啦啦啦啦啦</p>
        <p> 杀杀杀杀杀杀</p>
        <p> 大大大大大大</p>
        <p>烦烦烦烦烦烦 </p>
        <p>呱呱呱呱呱呱 </p>
        <p>哈哈哈哈哈哈 </p>
        <p>啵啵啵啵啵啵 </p>
        <p>斤斤计较经济界</p>
        <p>咩咩咩咩咩咩咩</p>
        <p>呃呃呃呃呃呃</p>
        <p>柔柔弱弱人人人</p>
        <p>她她她她她她她</p>
        <p>有有有有有有有</p>
        <p>噢噢噢噢哦哦哦</p>
        <p>怕怕怕怕怕怕怕</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useMouseInElement } from '@vueuse/core';

  const el = ref();
  const mouse = reactive(useMouseInElement(el));
  const transform = ref('');
  watch(
    () => mouse,
    (n) => {
      let box = el.value.getBoundingClientRect();
      let calcX = -(unref(mouse.y) - box.y - box.height / 2) / 10;
      let calcY = (unref(mouse.x) - box.x - box.width / 2) / 10;

      transform.value = 'rotateX(' + calcX + 'deg) ' + 'rotateY(' + calcY + 'deg)';
    },
    {
      deep: true,
    },
  );
</script>
<style lang="less" scoped>
  .scroll-wrap {
    height: 400px;
    overflow-y: auto;
    perspective: 200px;
    transform-style: preserve-3d;
    .scroll-inner {
      transform-style: preserve-3d;
      transform: translateY(calc(-50% + 100px)) translateZ(0) rotateX(90deg);
      transform-origin: bottom center;
      animation: move 10s infinite linear;
    }
    p {
      background: #1890ff;
      color: #fff;
      width: 280px;
      margin: 10px auto;
      padding: 10px;
      transform: rotateX(-90deg);
    }
  }
  @keyframes move {
    100% {
      transform: translateY(calc(-50% + 100px)) translateZ(calc(100vh + 120px)) rotateX(90deg);
    }
  }
  .d3-element {
    margin: auto;
    margin-top: 30px;
    width: 200px;
    height: 200px;
    background: #1890ff;
    transform-style: preserve-3d; // 元素的子元素是位于 3D 空间中还是平面中 =>位于 3D 空间中
    transition: all 0.1s;
    color: #fff;
    padding: 10px;
    perspective: 500px; //观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果
  }
  .container {
    padding: 20px;
    background-color: #fff;
    perspective: 500px;
  }
  .word_container {
    position: relative;
    margin: auto;
    font-size: 24px;
    line-height: 2;
    color: #666;
    cursor: pointer;
    text-align: justify;
  }
  .word {
    position: absolute;
    top: 0;
    left: 0;
    color: #000;
  }

  .word_pesudo {
    position: relative;
    background: linear-gradient(90deg, transparent, #fff 20%, #fff);
    background-size: 0 100%;
    background-repeat: no-repeat;
    background-position: 100% 100%;
    transition: all 3s linear;
    color: transparent;
  }
  .word_container:hover .word_pesudo,
  .word_container:active .word_pesudo {
    background-size: 500% 100%;
  }
  .css1 {
    -webkit-mask: linear-gradient(270deg, transparent, transparent 30%, #000),
      linear-gradient(270deg, #000, #000);
    mask: linear-gradient(270deg, transparent, transparent 30%, #000),
      linear-gradient(270deg, #000, #000);
    -webkit-mask-size: 100% 24px, 100% calc(100% - 24px);
    mask-size: 100% 24px, 100% calc(100% - 24px);
    -webkit-mask-position: bottom, top;
    mask-position: bottom, top;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }
  .word {
  }
</style>
